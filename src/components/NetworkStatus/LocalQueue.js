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

export async function syncQueueWithServer() {
    const queue = getQueuedOperations();
    if (queue.length === 0) return;
  
    try {
      for (const op of queue) {
        await fetch('http://localhost:8080/laptops/sync', {
          method: 'POST',
          body: JSON.stringify(op),
          headers: { 'Content-Type': 'application/json' },
        });
      }
      clearQueue();
    } catch (err) {
      console.error("Failed to sync", err);
    }
  }