import { NextRequest, NextResponse } from "next/server"
import { exec } from "child_process"
import { promisify } from "util"
import { readFile, unlink } from "fs/promises"
import { randomUUID } from "crypto"
import { tmpdir } from "os"
import { join } from "path"

const execAsync = promisify(exec)

const EDGE_TTS_PATH = "/Users/arianawarden/Library/Python/3.9/bin/edge-tts"

export async function GET(request: NextRequest) {
  const text = request.nextUrl.searchParams.get("text")
  if (!text) {
    return NextResponse.json({ error: "Missing text parameter" }, { status: 400 })
  }

  const tmpFile = join(tmpdir(), `tts-${randomUUID()}.mp3`)

  try {
    // Sanitize text for shell safety
    const safeText = text.replace(/'/g, "'\\''")
    await execAsync(
      `${EDGE_TTS_PATH} --voice fa-IR-FaridNeural --text '${safeText}' --write-media '${tmpFile}'`
    )

    const audioBuffer = await readFile(tmpFile)

    // Clean up temp file
    await unlink(tmpFile).catch(() => {})

    return new NextResponse(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=86400",
      },
    })
  } catch {
    await unlink(tmpFile).catch(() => {})
    return NextResponse.json({ error: "TTS generation failed" }, { status: 500 })
  }
}
