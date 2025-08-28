import { TThread } from "../type";
import { deleteRequest, get, post } from "./http-methods";

export async function getThreads({
  session_id,
}: {
  session_id: string;
}): Promise<TThread[]> {
  return get({ url_path: "/threads", session_id });
}

export async function getJobResult(job_id: string, session_id: string) {
  if (!job_id) return null;
  const url_path = `/response/${job_id}`;
  const response = await get({
    url_path,
    session_id,
  });
  return response;
}

export async function deleteThread(thread_id: string, session_id: string) {
  return deleteRequest({
    url_path: `/threads/${thread_id}`,
    session_id: session_id,
  });
}

export async function renameThread(
  thread_id: string,
  thread_name: string,
  session_id: string
) {
  return post({
    url_path: `/threads/${thread_id}/rename`,
    body_obj: { title: thread_name },
    session_id: session_id,
  });
}

export async function createThread(
  thread_id: string,
  thread_name: string,
  session_id: string
) {
  return post({
    url_path: `/threads`,
    body_obj: { thread_id, title: thread_name },
    session_id: session_id,
  });
}
