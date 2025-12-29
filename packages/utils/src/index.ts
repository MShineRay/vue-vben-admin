export * from './date/formatDate';
export * from './eventBus';
export * from './find-menu-by-path';
export * from './generate-device-id';
export * from './generate-menus';
export * from './generate-routes-backend';
export * from './generate-routes-frontend';
export * from './generate-visitor-id';
export * from './get-popup-container';
export * from './merge-route-modules';
export * from './reset-routes';
export * from './unmount-global-loading';
export * from './biz_enum'
export * from './export-utils'

export * from '@edp-core/shared/cache';
export * from '@edp-core/shared/color';

export * from '@edp-core/shared/utils';

// 递归查找指定 id 对应的父级对象
// export const findParentById = (options: any[], targetId: string, parent: any = null): any => {
//   for (const option of options) {
//     if (option.id === targetId) {
//       return parent;
//     }
//     if (option.children && option.children.length > 0) {
//       const result = findParentById(option.children, targetId, option);
//       if (result) {
//         return result;
//       }
//     }
//   }
//   return null;
// };

// 递归删除指定 id 对应的对象
// export const deleteOptionById = (options: any[], targetId: string): any[] => {
//   return options.filter(option => {
//     if (option.id === targetId) {
//       return false;
//     }
//     if (option.children && option.children.length > 0) {
//       option.children = deleteOptionById(option.children, targetId);
//     }
//     return true;
//   });
// };

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export function transformChildren(children) {
  if (!children) return [];
  return children.map(item => {
    const newItem = {
      id: item.id,
      value: item.key,
      label: item.name
    };
    if (item.children && item.children.length > 0) {
      newItem.children = transformChildren(item.children);
    }
    return newItem;
  });
}

/**
 * 递归查找当前节点
 * @param nodes
 * @param val
 * @param key
 */
export const findCurrentNode = (nodes=[], val='', key='id') => {
  for (const node of nodes) {
    if (node[key] === val) {
      return node;
    }
    if (node.children && node.children.length > 0) {
      const foundNode = findCurrentNode(node.children, val, key);
      if (foundNode) {
        return foundNode;
      }
    }
  }
  return null;
};


/**
 * 用于在嵌套的树形结构数据中查找指定值，并返回一个包含层级结构的数组。
 const data = [
 {
    id: '1',
    children: [
      { id: '1.1', children: [] },
      { id: '1.2', children: [{ id: '1.2.1', children: [] }] },
    ],
  },
 {
    id: '2',
    children: [],
  },
 ];

 console.log(findValue(data, '1.2.1')); // 输出: ['1', '1.2', '1.2.1']
 console.log(findValue(data, '3'));    // 输出: null
 * // 递归遍历list ，找到id与submitValue相同的条目,
 * // 然后向上查找其父级条目的id，直到找到根节点id，
 * // 将id和submitValue，一块儿生成一个具有层级结构的id数组，[根节点id, 父级id，...,submitValue]
 * @param data
 * @param value
 * @param key
 */

export const findHierarchyByValue = (data=[], value, key='id') => {
  for (const child of data) {
    if (child[key] === value) {
      return [child[key]];
    }
    if (child.children && child.children.length > 0) {
      const result = findHierarchyByValue(child.children, value, key);
      if (result) {
        return [child[key], ...result];
      }
    }
  }
  return null;
};
