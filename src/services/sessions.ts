import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { StudySession } from "../types";

function sessionsCol(uid: string) {
  return collection(db, "users", uid, "sessions");
}

function toSession(id: string, data: any): StudySession {
  const createdAtMs =
    typeof data?.createdAt?.toMillis === "function" ? data.createdAt.toMillis() : Date.now();
  const updatedAtMs =
    typeof data?.updatedAt?.toMillis === "function" ? data.updatedAt.toMillis() : createdAtMs;

  return {
    id,
    subject: String(data.subject ?? ""),
    minutes: Number(data.minutes ?? 0),
    notes: data.notes ? String(data.notes) : "",
    imageUrl: data.imageUrl ?? null,
    createdAtMs,
    updatedAtMs,
  };
}

export function listenToSessions(
  uid: string,
  onData: (sessions: StudySession[]) => void,
  onError?: (e: unknown) => void
) {
  const q = query(sessionsCol(uid), orderBy("createdAt", "desc"), limit(50));
  return onSnapshot(
    q,
    (snap) => {
      const sessions = snap.docs.map((d) => toSession(d.id, d.data()));
      onData(sessions);
    },
    (e) => onError?.(e)
  );
}

export async function createSession(uid: string, input: {
  subject: string;
  minutes: number;
  notes?: string;
  imageUrl?: string | null;
}) {
  await addDoc(sessionsCol(uid), {
    subject: input.subject,
    minutes: input.minutes,
    notes: input.notes ?? "",
    imageUrl: input.imageUrl ?? null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function getSession(uid: string, id: string): Promise<StudySession | null> {
  const ref = doc(db, "users", uid, "sessions", id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return toSession(snap.id, snap.data());
}

export async function updateSession(uid: string, id: string, patch: Partial<{
  subject: string;
  minutes: number;
  notes: string;
  imageUrl: string | null;
}>) {
  const refDoc = doc(db, "users", uid, "sessions", id);
  await updateDoc(refDoc, { ...patch, updatedAt: serverTimestamp() });
}

export async function deleteSession(uid: string, id: string) {
  await deleteDoc(doc(db, "users", uid, "sessions", id));
}
