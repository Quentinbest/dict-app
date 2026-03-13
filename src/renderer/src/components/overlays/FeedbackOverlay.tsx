interface FeedbackOverlayProps {
  onClose: () => void
}

export function FeedbackOverlay({ onClose }: FeedbackOverlayProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-end pb-24 pr-12"
      onClick={onClose}
    >
      <div
        className="w-[320px] bg-bg-sidebar rounded-lg shadow-2xl border border-divider p-4 flex flex-col gap-3"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <span className="text-dict-hdr font-semibold text-text-heading">Send Feedback</span>
          <button
            onClick={onClose}
            className="no-drag w-5 h-5 flex items-center justify-center hover:opacity-70 text-text-secondary"
          >
            ✕
          </button>
        </div>
        <textarea
          placeholder="Describe your feedback..."
          className="w-full h-24 bg-bg-input rounded text-def-body text-text-primary placeholder:text-text-secondary outline-none resize-none p-2"
        />
        <button className="self-end px-4 py-1.5 rounded bg-accent-blue text-white text-sidebar text-sm hover:opacity-90 transition-opacity">
          Send
        </button>
      </div>
    </div>
  )
}
