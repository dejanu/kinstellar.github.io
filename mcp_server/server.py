"""Minimal MCP server for launching itmapper interview page."""

from __future__ import annotations

import platform
import webbrowser

from mcp.server.fastmcp import FastMCP

INTERVIEW_URL = "https://itmapper.github.io/"

mcp = FastMCP("itmapper-interview-server")


def _open_command_for_os(url: str) -> str:
    """Return an OS-specific shell command that opens a URL."""
    system_name = platform.system().lower()
    if "darwin" in system_name:
        return f'open "{url}"'
    if "windows" in system_name:
        return f'start "" "{url}"'
    return f'xdg-open "{url}"'


@mcp.tool()
def open_interview_page() -> dict[str, str]:
    """Open the hosted interview app in the user's default browser."""
    webbrowser.open(INTERVIEW_URL, new=2)
    return {
        "status": "opened",
        "url": INTERVIEW_URL,
        "open_command": _open_command_for_os(INTERVIEW_URL),
        "next_step": "In the opened page, enter target role and API key, then click Start Interview.",
    }


@mcp.prompt(name="interviewnow")
def interviewnow() -> str:
    """Prompt that starts an interview session flow."""
    return (
        "Start an interview session now.\n"
        "1) Call the MCP tool `open_interview_page` immediately.\n"
        "2) After opening, tell the user to enter target role and OpenAI API key.\n"
        "3) Ask the user to click `Start Interview`.\n"
        f"If tool calling is unavailable, instruct the user to run: {_open_command_for_os(INTERVIEW_URL)}"
    )


if __name__ == "__main__":
    mcp.run()
