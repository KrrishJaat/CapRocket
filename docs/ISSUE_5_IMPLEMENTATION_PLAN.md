# Issue #5 implementation plan

This fork tracks the requested quality-of-life enhancements from https://github.com/medhachim/CapRocket/issues/5.

## Priority implementation phases

### Phase 1 — core editing workflow
- Make Space toggle timeline playback even when a range input (such as Volume) has focus, while preserving Space-as-input in text fields.
- Improve trim-handle interaction: use resize cursors and avoid showing selected-clip styling while the user is trimming.
- Allow caption text to be copied and exported as SRT for downstream editing.
- Fix caption generation to use the clip's effective playback rate/speed-adjusted audio.
- Add a vertical 9:16 editing workspace mode.
- Allow the timeline panel height to be collapsed to a compact minimum and restored.

### Phase 2 — media engine and audio workflow
- Add CUDA Whisper support as an optional backend, detected at runtime, with CPU fallback.
- Add draggable audio fade-in/fade-out envelope points and corresponding export rendering.
- Replace the saturated audio lane green with a lower-contrast professional waveform palette.
- Make unused timeline lanes configurable and add/remove lanes on demand.

### Phase 3 — creative tools
- Expand title and caption presets (documentary, cinematic, professional, trendy).
- Add text effects while keeping the preview and export renderers in sync.

## Constraints
- Preserve the app's offline-first behavior and MIT-licensed codebase.
- Never require CUDA: CPU Whisper remains supported.
- Keep existing project files backward-compatible; new project properties must have safe defaults.
- Run the existing export smoke test and targeted UI/logic tests before proposing upstream changes.

## Current baseline notes
- Space shortcut currently ignores every INPUT/TEXTAREA/SELECT target, which is why sliders consume Space.
- The existing timeline has only three hard-coded lanes (text, video, audio).
- The editor already has a project reducer with undo/redo, an Electron IPC preload bridge, and an export dialog.
