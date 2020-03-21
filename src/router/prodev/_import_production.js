/*
 * @Author: your name
 * @Date: 2020-03-07 10:34:44
 * @LastEditTime: 2020-03-07 10:42:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bolg_webd:\私活\鸡-10K\chicken\src\router\prodev\_import_production.js
 */
module.exports = file => () => import('../../components/views/' + file + '.vue')