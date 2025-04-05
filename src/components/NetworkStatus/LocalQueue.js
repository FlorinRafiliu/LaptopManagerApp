const QUEUE_KEY = 'offline_queue';

export function queueOperation(op) {
  const queue = JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]');
  queue.push(op);
  localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
}

export function getQueuedOperations() {
  return JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]');
}

export function clearQueue() {
  localStorage.removeItem(QUEUE_KEY);
}