# 长安 · 月下归途

唐风幻想长安中的第三人称仙侠探索关卡。

入口：site/hi3d-changan.html。GitHub Pages 发布 site 目录，公开网址以 /hi3d-changan.html 结尾。

WASD跑步，空格连续跳跃，Shift御剑或降落；飞行时空格升、C降；E交互，J灵息，K招架，Q合击；P/Esc暂停，L行旅，M全景。

游戏包含钟声解谜、旋镜通桥、同行仙子、三阶段战斗和结局。需要支持WebGL的现代桌面浏览器。完整高精度资源约216 MiB，首次加载需要时间。存档保存在本机浏览器，不是多人联机游戏。

跑步数据来源 CMU Graphics Lab Motion Capture Database 09_01，Bruce Hahne BVH转换。许可与说明见 site/hi3d-mocap-license.txt。Three.js依赖保留原始许可证头。

更新：修改site目录后推送main，由GitHub Actions部署。

## 移动流畅度修复
镜头与施法视线使用轻量碰撞体，取消周期性高模逐三角检测；跟随不再在路径节点停帧。均分物理子步，平滑跑步速度切换，界面按10 Hz刷新。模型、贴图和原始动作数据保持不变。
