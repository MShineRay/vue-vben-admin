/**
 * 导出相关工具函数
 */

/**
 * 生成带时间戳的文件名
 * @param prefix 文件名前缀（如：订单列表、报名列表等）
 * @param suffix 文件名后缀（可选，如：状态、类型等）
 * @param extension 文件扩展名，默认为 '.xlsx'
 * @returns 格式化的文件名，如：订单列表_20250113_143025.xlsx
 */
export function generateExportFileName(
  prefix: string,
  suffix?: string,
  extension: string = '.xlsx'
): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  const dateTimeStr = `${year}${month}${day}_${hours}${minutes}${seconds}`
  
  const parts = [prefix]
  if (suffix) {
    parts.push(suffix)
  }
  parts.push(dateTimeStr)
  
  return `${parts.join('_')}${extension}`
}

/**
 * 清理文件名，移除非法字符
 * @param fileName 原始文件名
 * @param maxLength 最大长度，默认 30
 * @returns 清理后的文件名
 */
export function sanitizeFileName(fileName: string, maxLength: number = 30): string {
  return fileName
    .replace(/[/\\:*?"<>|]/g, '')
    .trim()
    .substring(0, maxLength)
}

