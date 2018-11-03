/*
 * @Author: AK-12 
 * @Date: 2018-11-02 13:06:11 
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-03 17:28:10
 */
import { Point } from './IMathVec'
/**
 * 获取单例
 * @function getInstance
 * ***
 * 加载prefab缓存
 * @function initPool
 * ***
 * 获取cc.NodePool对象
 * @param BlockPool cc.NodePool
 * ***
 * @export
 * @class Model
 */
export default class Model {
  private constructor() {
    this._BlockPool = new cc.NodePool()
    this._nodeList = new Array<cc.Node>()
    this._recordList = new Array<Point>()
  }
  static instance: Model
  static getInstance(): Model {
    this.instance = !!this.instance ? this.instance : new Model()
    return this.instance
  }
  private _BlockPool: cc.NodePool
  private _prafab: cc.Prefab
  private _nodeList: cc.Node[]
  private _recordList: Array<Point>
  public initPool(prefab: cc.Prefab, size: number) {
    for (let i = 0; i < size; ++i) {
      let block = cc.instantiate(prefab)
      this._BlockPool.put(block)
    }
    this._prafab = prefab
  }
  get NodeList(): cc.Node[] {
    return this._nodeList
  }
  get PointList(): Array<Point> {
    this._recordList = []
    return this._recordList
  }
  public putBlock(node: cc.Node): void {
    this._BlockPool.put(node)
  }
  public getBlock(): cc.Node {
    let block = null
    if (this._BlockPool.size() > 0) {
      block = this._BlockPool.get()
    } else {
      block = cc.instantiate(this._prafab)
    }
    return block
  }
  public saveNode(node: cc.Node, vec2: cc.Vec2): void {
    this._nodeList.push(node)
    this._recordList.push(vec2)
  }
  public clearNodeList(): void {
    for (var node of this._nodeList) {
      this._BlockPool.put(node)
      this._nodeList = []
    }
  }
  public ClearPool(): void {
    this._BlockPool.clear()
  }
  public log(): void {
    console.log(this._BlockPool.size())
  }
}
