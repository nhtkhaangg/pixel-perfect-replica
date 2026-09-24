/** Vietnamese formatting helpers. */

export function formatCurrency(value: number): string {
  return `${new Intl.NumberFormat("vi-VN").format(value)} VNĐ`;
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("vi-VN").format(value);
}

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

export function formatDate(value: Date | string): string {
  const d = typeof value === "string" ? new Date(value) : value;
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
}

export function formatTime(value: Date | string): string {
  const d = typeof value === "string" ? new Date(value) : value;
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function formatDateTime(value: Date | string): string {
  return `${formatDate(value)} ${formatTime(value)}`;
}
