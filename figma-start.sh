#!/bin/bash
# figma-start.sh — Start the WebSocket bridge for Figma remote control
# Run this BEFORE launching Claude Code and before running the Figma plugin.
#
# Architecture:
#   Claude Code → (stdio) → MCP Server (bunx cursor-talk-to-figma-mcp)
#                                 ↕ WebSocket client
#                  Socket Bridge  ← THIS SCRIPT  (port 3055)
#                                 ↕ WebSocket client
#                  Figma Plugin  (running inside Figma desktop)

set -e

PORT=3055

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Figma Remote Control — WebSocket Bridge"
echo "  Port: $PORT"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Step 1/3 ✅  Socket bridge starting on ws://localhost:$PORT"
echo "Step 2/3 ⏳  Open Figma → run 'Talk to Figma MCP' plugin → click Connect"
echo "Step 3/3 ⏳  Claude Code will auto-connect via .mcp.json on next session start"
echo ""
echo "Press Ctrl+C to stop."
echo ""

bunx cursor-talk-to-figma-socket@latest
