#!/bin/bash

# AI Security Checklist - Local Deployment Script
echo "🚀 Starting AI Security Checklist Local Server..."

# Navigate to project directory
cd "$(dirname "$0")"

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    echo "✅ Using Python 3 HTTP Server"
    echo "📡 Starting server on http://localhost:8000"
    echo "🌐 Opening AI Security Checklist..."
    
    # Start server in background
    python3 -m http.server 8000 &
    SERVER_PID=$!
    
    # Wait a moment for server to start
    sleep 2
    
    # Open the AI Security Checklist in browser
    if command -v open &> /dev/null; then
        open http://localhost:8000/ai_security_checklist.html
    elif command -v xdg-open &> /dev/null; then
        xdg-open http://localhost:8000/ai_security_checklist.html
    else
        echo "🌐 Manual: Open http://localhost:8000/ai_security_checklist.html in your browser"
    fi
    
    echo "✅ AI Security Checklist is now running!"
    echo "📋 Features:"
    echo "   • 65+ Security Checklist Items"
    echo "   • 20+ Prompt Testing Examples"
    echo "   • Interactive Red Teaming Framework"
    echo "   • 18 AI Threat Categories"
    echo "   • Real-time Progress Tracking"
    echo ""
    echo "⚠️  DEFENSIVE SECURITY TESTING ONLY"
    echo "   Use prompt examples responsibly and only on authorized systems"
    echo ""
    echo "🛑 Press Ctrl+C to stop the server"
    
    # Keep script running until interrupted
    trap "kill $SERVER_PID; echo '🛑 Server stopped'; exit 0" INT
    wait $SERVER_PID
    
elif command -v python &> /dev/null; then
    echo "✅ Using Python 2 HTTP Server"
    echo "📡 Starting server on http://localhost:8000"
    echo "🌐 Opening AI Security Checklist..."
    
    python -m SimpleHTTPServer 8000 &
    SERVER_PID=$!
    sleep 2
    
    if command -v open &> /dev/null; then
        open http://localhost:8000/ai_security_checklist.html
    elif command -v xdg-open &> /dev/null; then
        xdg-open http://localhost:8000/ai_security_checklist.html
    else
        echo "🌐 Manual: Open http://localhost:8000/ai_security_checklist.html in your browser"
    fi
    
    echo "✅ AI Security Checklist is now running!"
    echo "🛑 Press Ctrl+C to stop the server"
    
    trap "kill $SERVER_PID; echo '🛑 Server stopped'; exit 0" INT
    wait $SERVER_PID
    
else
    echo "❌ Python not found. Please install Python or use alternative method:"
    echo ""
    echo "📁 Direct File Access:"
    echo "   open ai_security_checklist.html"
    echo ""
    echo "🌐 Or drag ai_security_checklist.html into your web browser"
    exit 1
fi