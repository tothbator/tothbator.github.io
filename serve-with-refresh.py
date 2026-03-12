#!/usr/bin/env python3
"""
Simple HTTP server with auto-refresh capability.
Watches for file changes and injects auto-refresh script into HTML pages.
"""
import http.server
import socketserver
import os
import sys
from pathlib import Path

PORT = 8000

AUTO_REFRESH_SCRIPT = """
<script>
(function() {
    const ws = new WebSocket('ws://localhost:8001/');
    ws.onmessage = function(event) {
        if (event.data === 'reload') {
            window.location.reload();
        }
    };
    ws.onerror = function() {
        // WebSocket failed, fallback to polling
        setInterval(function() {
            fetch('/__check_reload').then(r => r.text()).then(data => {
                if (data === 'reload') window.location.reload();
            }).catch(() => {});
        }, 1000);
    };
})();
</script>
"""

class AutoRefreshHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers for development
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()
    
    def do_GET(self):
        if self.path == '/__check_reload':
            # Simple polling endpoint
            self.send_response(200)
            self.send_header('Content-type', 'text/plain')
            self.end_headers()
            self.wfile.write(b'no')
            return
        
        # Serve normal files
        return super().do_GET()
    
    def guess_type(self, path):
        mimetype, encoding = super().guess_type(path)
        # Inject auto-refresh script into HTML files
        if mimetype and mimetype.startswith('text/html'):
            return mimetype, encoding
        return mimetype, encoding

def inject_auto_refresh(content):
    """Inject auto-refresh script before closing body tag"""
    if b'</body>' in content:
        script_bytes = AUTO_REFRESH_SCRIPT.encode('utf-8')
        content = content.replace(b'</body>', script_bytes + b'\n</body>')
    return content

class CustomHandler(AutoRefreshHandler):
    def do_GET(self):
        if self.path == '/__check_reload':
            AutoRefreshHandler.do_GET(self)
            return
        
        # Get the file path
        if self.path == '/':
            self.path = '/index.html'
        
        file_path = Path(self.translate_path(self.path))
        
        if file_path.is_file() and file_path.suffix == '.html':
            try:
                with open(file_path, 'rb') as f:
                    content = f.read()
                
                # Inject auto-refresh script
                content = inject_auto_refresh(content)
                
                self.send_response(200)
                self.send_header('Content-type', 'text/html; charset=utf-8')
                self.send_header('Content-length', str(len(content)))
                self.end_headers()
                self.wfile.write(content)
                return
            except Exception as e:
                self.send_error(500, str(e))
                return
        
        # Serve other files normally
        return super().do_GET()

if __name__ == '__main__':
    os.chdir(Path(__file__).parent)
    
    Handler = CustomHandler
    
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Server running at http://localhost:{PORT}/")
        print("Auto-refresh enabled - changes will reload the browser")
        print("Press Ctrl+C to stop")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped")
            sys.exit(0)

