#!/usr/bin/env python3
"""
Simple HTTP server for testing the Afrilink Corporation website locally.
Run this script and navigate to http://localhost:8000 to view the website.
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8000

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add headers to prevent caching during development
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

def main():
    # Change to the website directory
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    # Create server
    with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
        print(f"Serving Afrilink Corporation website at http://localhost:{PORT}")
        print(f"Press Ctrl+C to stop the server")
        
        # Try to open browser automatically
        try:
            webbrowser.open(f'http://localhost:{PORT}')
        except:
            pass
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")
            sys.exit(0)

if __name__ == "__main__":
    main()