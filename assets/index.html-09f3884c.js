import{_ as c,r as s,o,c as i,a as n,b as t,d as a,e as l}from"./app-1bbcc8ed.js";const u="/blog-website/assets/动画2-ff305582.gif",r={},d=l('<h1 id="歌词滚动效果" tabindex="-1"><a class="header-anchor" href="#歌词滚动效果" aria-hidden="true">#</a> 歌词滚动效果</h1><p><img src="'+u+`" alt="歌词滚动效果"></p><p>效果：</p><ol><li>歌词随着歌曲的播放而同步滚动</li><li>正在演唱的歌词高亮显示</li><li>高亮的歌词在歌词区域的中间位置</li></ol><h2 id="思路" tabindex="-1"><a class="header-anchor" href="#思路" aria-hidden="true">#</a> 思路</h2><ol><li><p>事先准备好歌词和歌曲文件</p><ul><li>歌曲可以是任何 <code>audio</code> 元素可以播放的格式</li><li>歌词是 .lrc 文件，本质是包含了每句歌词的内容和开始时间的字符串</li></ul></li><li><p>字符串格式的歌词很难用，需要先处理为 js 方便操作的数据结构</p></li><li><p><code>audio</code> 元素有一个 <code>currentTime</code> 属性，可以获取当前播放的时间</p></li><li><p>根据当前播放的时间，计算出当前演唱的歌词</p></li><li><p>高亮显示当前演唱的歌词，并且让高亮的歌词在歌词区域的中间位置</p></li></ol><h2 id="准备工作" tabindex="-1"><a class="header-anchor" href="#准备工作" aria-hidden="true">#</a> 准备工作</h2><p>我先去网上下载了张学友的《等你等到我心痛》mp3 文件，然后在网上找了一份歌词，保存为 <code>lrc-data.lrc</code> 文件。</p><p>我将歌词内容复制到 js 文件中，方便直接使用：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 导出歌词</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">[00:00]等你等到我心痛 - 张学友 (Jacky Cheung)
[00:05]词：小雪
[00:10]曲：黎沸挥
[00:15]在这美丽的夜里
[00:18]等你等到我心碎
[00:22]怎么不见旧爱侣
[00:26]问问为何我空虚
[00:30]是我错失的字句
[00:33]把你伤透我不对
</span><span class="token template-punctuation string">\`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="页面布局" tabindex="-1"><a class="header-anchor" href="#页面布局" aria-hidden="true">#</a> 页面布局</h2><p>先画出页面的基本结构：</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>audio</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>./data/11315.mp3<span class="token punctuation">&quot;</span></span> <span class="token attr-name">controls</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>audio</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>container<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>lrc-list<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>样式随意，重点是 js</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">*</span> <span class="token punctuation">{</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">html,
body</span> <span class="token punctuation">{</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">body</span> <span class="token punctuation">{</span>
  <span class="token property">padding-top</span><span class="token punctuation">:</span> 80px<span class="token punctuation">;</span>
  <span class="token property">box-sizing</span><span class="token punctuation">:</span> border-box<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> #f2f6fc<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.container</span> <span class="token punctuation">{</span>
  <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
  <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 450px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">audio</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> fixed<span class="token punctuation">;</span>
  <span class="token property">left</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">top</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">z-index</span><span class="token punctuation">:</span> 10<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">li</span> <span class="token punctuation">{</span>
  <span class="token property">list-style</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>
  <span class="token property">line-height</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>
  <span class="token property">transition</span><span class="token punctuation">:</span> 0.5s<span class="token punctuation">;</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 18px<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #909399<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">li.active</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #409eff<span class="token punctuation">;</span>
  <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">scale</span><span class="token punctuation">(</span>1.2<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.lrc-list</span> <span class="token punctuation">{</span>
  <span class="token property">transition</span><span class="token punctuation">:</span> 0.5s<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">audio</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="处理歌词" tabindex="-1"><a class="header-anchor" href="#处理歌词" aria-hidden="true">#</a> 处理歌词</h2><p>写个函数，将上面的歌词字符串处理为方便我们操作的数据结构，比如:</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// startTime 表示歌词从多少秒开始演唱</span>
<span class="token punctuation">;</span><span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">startTime</span><span class="token operator">:</span> <span class="token number">15.5</span><span class="token punctuation">,</span>
    <span class="token literal-property property">words</span><span class="token operator">:</span> <span class="token string">&#39;在这美丽的夜里&#39;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">startTime</span><span class="token operator">:</span> <span class="token number">18.5</span><span class="token punctuation">,</span>
    <span class="token literal-property property">words</span><span class="token operator">:</span> <span class="token string">&#39;等你等到我心碎&#39;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>方法也比较简单，先用 <code>\\n</code> 换行符将歌词拆成一句一句的。</p><p>然后再用 <code>]</code> 将每句歌词拆成两部分，第一部分是时间，第二部分是歌词内容。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">parseLRC</span><span class="token punctuation">(</span><span class="token parameter">lrcString</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> lrcArr <span class="token operator">=</span> lrcString<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&#39;\\n&#39;</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> lrcArr<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">lrc</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> <span class="token punctuation">[</span>startTime<span class="token punctuation">,</span> words<span class="token punctuation">]</span> <span class="token operator">=</span> lrc<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&#39;]&#39;</span><span class="token punctuation">)</span>

    <span class="token keyword">const</span> <span class="token punctuation">[</span>m<span class="token punctuation">,</span> s<span class="token punctuation">]</span> <span class="token operator">=</span> startTime<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&#39;:&#39;</span><span class="token punctuation">)</span>

    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token comment">// + 0.5 秒，是因为我下载的歌词时间有点误差</span>
      <span class="token literal-property property">startTime</span><span class="token operator">:</span> <span class="token function">Number</span><span class="token punctuation">(</span>m<span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">60</span> <span class="token operator">+</span> <span class="token function">Number</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">0.5</span><span class="token punctuation">,</span>
      words
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="创建歌词节点" tabindex="-1"><a class="header-anchor" href="#创建歌词节点" aria-hidden="true">#</a> 创建歌词节点</h2><p>有了上面的数据之后，就可以创建歌词节点，展示到页面上了。</p><p>在这之前，我们先获取到我们会用到的 dom 元素：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> doms <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// 歌词区域的容器</span>
  <span class="token literal-property property">container</span><span class="token operator">:</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;.container&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token comment">// 播放器</span>
  <span class="token literal-property property">audio</span><span class="token operator">:</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;audio&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token comment">// 歌词列表 ul</span>
  <span class="token literal-property property">lrcList</span><span class="token operator">:</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;.lrc-list&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 将歌词字符串转换为歌词数组</span>
<span class="token keyword">const</span> lrcData <span class="token operator">=</span> <span class="token function">parseLRC</span><span class="token punctuation">(</span>lrc<span class="token punctuation">)</span>

<span class="token keyword">function</span> <span class="token function">createLRCElements</span><span class="token punctuation">(</span><span class="token parameter">lrcArray</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> flag <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createDocumentFragment</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  lrcArray<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">lrc</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> li <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;li&#39;</span><span class="token punctuation">)</span>
    li<span class="token punctuation">.</span>textContent <span class="token operator">=</span> lrc<span class="token punctuation">.</span>words
    flag<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>li<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token keyword">return</span> flag
<span class="token punctuation">}</span>

<span class="token comment">// 创建歌词元素，将元素插入到lrcList</span>
doms<span class="token punctuation">.</span>lrcList<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span><span class="token function">createLRCElements</span><span class="token punctuation">(</span>lrcData<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="计算正在演唱的歌词" tabindex="-1"><a class="header-anchor" href="#计算正在演唱的歌词" aria-hidden="true">#</a> 计算正在演唱的歌词</h2><p><code>audio</code> 元素有个 <code>currentTime</code> 属性，可以获取当前播放的时间，单位是秒。</p><p>我们可以根据这个时间，计算出当前演唱的歌词。</p><p>计算的方法是，遍历歌词数组，找到第一个 <code>startTime</code> 大于 <code>currentTime</code> 的歌词，那么前一句歌词就是当前演唱的歌词。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">findIndex</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> currentTime <span class="token operator">=</span> doms<span class="token punctuation">.</span>audio<span class="token punctuation">.</span>currentTime
  <span class="token keyword">const</span> index <span class="token operator">=</span> lrcData<span class="token punctuation">.</span><span class="token function">findIndex</span><span class="token punctuation">(</span><span class="token parameter">lrc</span> <span class="token operator">=&gt;</span> lrc<span class="token punctuation">.</span>startTime <span class="token operator">&gt;</span> currentTime<span class="token punctuation">)</span>

  <span class="token comment">// 没找到，说明播放完了，返回最后一句歌词的index</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">===</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> lrcData<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 第一句歌词</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> index
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> index <span class="token operator">-</span> <span class="token number">1</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们调用 findIndex 函数，就知道当前演唱的歌词的 index，其实也是前面生成的歌词元素的 index。</p><h2 id="歌词滚动和高亮" tabindex="-1"><a class="header-anchor" href="#歌词滚动和高亮" aria-hidden="true">#</a> 歌词滚动和高亮</h2><p>有了当前演唱的歌词的 index，就可以高亮显示当前演唱的歌词，并且计算出歌词列表的便宜距离了。</p><p>当前高亮的歌词的 index 就是上面 findIndex 函数的返回值。歌词列表的偏移距离是：当前高亮的歌词的 index 乘以每句歌词的高度，再减去容器的高度的一半，再加上一句歌词的高度的一半。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 容器高度</span>
<span class="token keyword">const</span> containerHeight <span class="token operator">=</span> doms<span class="token punctuation">.</span>container<span class="token punctuation">.</span>clientHeight
<span class="token comment">// 每句歌词的高度</span>
<span class="token keyword">const</span> lrcLineHeight <span class="token operator">=</span> doms<span class="token punctuation">.</span>lrcList<span class="token punctuation">.</span>children<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>clientHeight
<span class="token comment">// 上一句歌词的index</span>
<span class="token keyword">let</span> lastIndex <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span>

<span class="token keyword">function</span> <span class="token function">setOffset</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 获取正在演唱的歌词 index</span>
  <span class="token keyword">const</span> index <span class="token operator">=</span> <span class="token function">findIndex</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token comment">// 音乐在播放，但歌词没有变化，不需要设置</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">===</span> lastIndex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span>
  <span class="token punctuation">}</span>

  lastIndex <span class="token operator">=</span> index

  <span class="token comment">// 计算偏移量: index 行歌词的高度 - 容器高度的一半 + 一行歌词的高度的一半</span>
  <span class="token comment">// 加上一行歌词的高度的一半的原因是，让当前歌词在容器的中间</span>
  <span class="token keyword">let</span> top <span class="token operator">=</span> index <span class="token operator">*</span> lrcLineHeight <span class="token operator">-</span> containerHeight <span class="token operator">/</span> <span class="token number">2</span> <span class="token operator">+</span> lrcLineHeight <span class="token operator">/</span> <span class="token number">2</span>

  <span class="token comment">// 获取上一句歌词</span>
  <span class="token keyword">let</span> li <span class="token operator">=</span> doms<span class="token punctuation">.</span>lrcList<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;li.active&#39;</span><span class="token punctuation">)</span>
  <span class="token comment">// 如果有上一句歌词，移除active效果</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>li<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    li<span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token string">&#39;active&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 获取当前歌词</span>
  li <span class="token operator">=</span> doms<span class="token punctuation">.</span>lrcList<span class="token punctuation">.</span>children<span class="token punctuation">[</span>index<span class="token punctuation">]</span>
  <span class="token comment">// 如果有当前歌词，添加active效果</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>li<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    li<span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&#39;active&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 设置偏移量</span>
  doms<span class="token punctuation">.</span>lrcList<span class="token punctuation">.</span>style<span class="token punctuation">.</span>transform <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">translateY(-</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>top<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">px)</span><span class="token template-punctuation string">\`</span></span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后为 audio 元素添加一个 <code>timeupdate</code> 事件，当音乐播放的时候，就会触发这个事件，我们就可以在这个事件中，调用上面的 <code>setOffset</code> 函数，让歌词滚动起来了。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>doms<span class="token punctuation">.</span>audio<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;timeupdate&#39;</span><span class="token punctuation">,</span> setOffset<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>实现“歌词滚动”效果的关键点就是找出当前正在演唱的歌词，并且准确的计算出歌词列表的偏移量。</p><p>至于前期的准备工作，比如歌词的处理，歌词节点的创建，都是为了后面的计算偏移量服务的，这部分工作本身也不难。</p>`,41),k={href:"https://github.com/yuanwer/web-interaction/blob/main/07-%E6%AD%8C%E8%AF%8D%E6%BB%9A%E5%8A%A8%E6%95%88%E6%9E%9C/01/index.html",target:"_blank",rel:"noopener noreferrer"},v=n("h2",{id:"评论区",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#评论区","aria-hidden":"true"},"#"),t(" 评论区")],-1);function m(b,g){const e=s("ExternalLinkIcon"),p=s("CommentService");return o(),i("div",null,[d,n("p",null,[n("a",k,[t("点击查看源码"),a(e)])]),v,a(p)])}const f=c(r,[["render",m],["__file","index.html.vue"]]);export{f as default};
