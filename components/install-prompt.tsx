"use client";

import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISS_KEY = "install-banner-dismissed";
const VISIT_KEY = "install-banner-visits";

export function InstallPrompt({
  appName,
  headline = "Add to your device",
}: {
  appName: string;
  headline?: string;
}) {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        /* registration failed — non-fatal */
      });
    }
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(display-mode: standalone)");
    const syncStandalone = (e: MediaQueryListEvent | MediaQueryList) =>
      setIsStandalone(e.matches);
    syncStandalone(mq);
    mq.addEventListener("change", syncStandalone);

    const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);

    let timer: ReturnType<typeof setTimeout> | undefined;
    let dismissed = false;
    try {
      dismissed = localStorage.getItem(DISMISS_KEY) === "1";
    } catch {
      /* storage unavailable */
    }

    if (!dismissed) {
      let visits = 0;
      try {
        visits = Number(localStorage.getItem(VISIT_KEY) || "0");
        localStorage.setItem(VISIT_KEY, String(visits + 1));
      } catch {
        /* storage unavailable */
      }
      // Subtle banner for returning visitors (2nd visit onward); iOS has no
      // install prompt event, so surface the manual hint right away.
      if (visits >= 1 || isIos) {
        timer = setTimeout(() => setVisible(true), 3000);
      }
    }

    return () => {
      mq.removeEventListener("change", syncStandalone);
      window.removeEventListener("beforeinstallprompt", onPrompt);
      if (timer) clearTimeout(timer);
    };
  }, []);

  if (!visible || isStandalone) return null;

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* storage unavailable */
    }
  };

  const install = async () => {
    if (!deferred) return;
    const choice = await deferred.prompt().then(() => deferred.userChoice);
    if (choice.outcome === "accepted") dismiss();
    else setVisible(false);
  };

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4">
      <div
        role="status"
        className="flex w-full max-w-md items-center gap-3 rounded-xl border border-border bg-background/95 p-3 shadow-lg backdrop-blur"
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Download className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1 text-sm">
          <p className="font-medium text-foreground">
            {deferred ? headline : "Install " + appName}
          </p>
          <p className="text-xs text-muted-foreground">
            {deferred
              ? `${appName} opens in one click from your home screen.`
              : "Tap Share, then “Add to Home Screen”."}
          </p>
        </div>
        {deferred ? (
          <button
            type="button"
            onClick={install}
            className="shrink-0 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Install
          </button>
        ) : null}
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss"
          className="shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
