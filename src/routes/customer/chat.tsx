import { createFileRoute } from "@tanstack/react-router";
import { Paperclip, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { CPage, meta } from "@/components/customer/common";
import { InitialsAvatar } from "@/components/public/blocks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatTime } from "@/lib/format";
import { CHAT_MESSAGES, ME } from "@/lib/mock/customer";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/customer/chat")({
  head: () => meta("Trò chuyện với huấn luyện viên", "Nhắn tin trực tiếp với huấn luyện viên cá nhân."),
  component: Chat,
});

const QUICK = ["Em đến muộn 10 phút ạ", "Hôm nay em hơi mệt", "Anh gửi thực đơn tuần này giúp em"];

function Chat() {
  const [msgs, setMsgs] = useState<{ from: string; text: string; time: string }[]>([...CHAT_MESSAGES]);
  const [text, setText] = useState("");
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => end.current?.scrollIntoView({ block: "end" }), [msgs]);
  const send = (t: string) => {
    if (!t.trim()) return;
    setMsgs((m) => [...m, { from: "me", text: t.trim(), time: new Date().toISOString() }]);
    setText("");
    setTimeout(() => setMsgs((m) => [...m, { from: "trainer", text: "Anh đã nhận được, sẽ phản hồi em sớm nhé!", time: new Date().toISOString() }]), 1200);
  };
  return (
    <CPage title="Trò chuyện với huấn luyện viên">
      <section className="card-surface flex h-[calc(100vh-15rem)] min-h-[480px] flex-col overflow-hidden">
        <header className="flex items-center gap-3 border-b border-border p-4">
          <InitialsAvatar name={ME.trainerName} className="size-10 text-sm" />
          <div className="flex-1"><p className="font-semibold">{ME.trainerName}</p><p className="flex items-center gap-1.5 text-xs text-primary"><span className="size-1.5 rounded-full bg-primary" /> Đang hoạt động</p></div>
        </header>
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          <p className="text-center text-xs text-muted-foreground">Hôm nay</p>
          {msgs.map((m, i) => (
            <div key={i} className={cn("flex", m.from === "me" ? "justify-end" : "justify-start")}>
              <div className={cn("max-w-[78%] rounded-2xl px-4 py-2.5 text-sm", m.from === "me" ? "rounded-br-sm bg-primary text-primary-foreground" : "rounded-bl-sm bg-secondary")}>
                <p>{m.text}</p>
                <p className={cn("mt-1 text-[10px]", m.from === "me" ? "text-primary-foreground/70" : "text-muted-foreground")}>{formatTime(m.time)}</p>
              </div>
            </div>
          ))}
          <div ref={end} />
        </div>
        <div className="flex gap-2 overflow-x-auto border-t border-border px-4 pt-3">
          {QUICK.map((q) => <button key={q} onClick={() => send(q)} className="shrink-0 cursor-pointer rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:text-foreground">{q}</button>)}
        </div>
        <form className="flex gap-2 p-4" onSubmit={(e) => { e.preventDefault(); send(text); }}>
          <Button type="button" variant="ghost" size="icon" aria-label="Đính kèm"><Paperclip size={17} /></Button>
          <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Nhập tin nhắn…" />
          <Button type="submit" size="icon" aria-label="Gửi"><Send size={16} /></Button>
        </form>
      </section>
    </CPage>
  );
}
