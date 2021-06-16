<template>
  <div>
    <h2>我的</h2>
    <scroll class="content" :probe-type="3" :pull-up-load="true">
      <ul>
        <li>wocao1</li>
        <li>wocao2</li>
        <li>wocao3</li>
        <li>wocao4</li>
        <li>wocao5</li>
        <li>wocao6</li>
        <li>wocao7</li>
        <li>wocao8</li>
        <li>wocao9</li>
        <li>wocao10</li>
        <li>wocao11</li>
        <li>wocao12</li>
        <li>wocao13</li>
        <li>wocao14</li>
        <li>wocao15</li>
        <li>wocao16</li>
        <li>wocao17</li>
        <li>wocao18</li>
        <li>wocao19</li>
        <li>wocao20</li>
        <li>wocao21</li>
        <li>wocao22</li>
        <li>wocao23</li>
        <li>wocao24</li>
        <li>wocao25</li>
        <li>wocao26</li>
        <li>wocao27</li>
        <li>wocao28</li>
        <li>wocao29</li>
        <li>wocao30</li>
        <li>wocao31</li>
        <li>wocao32</li>
        <li>wocao33</li>
        <li>wocao34</li>
        <li>wocao35</li>
        <li>wocao36</li>
        <li>wocao37</li>
        <li>wocao38</li>
        <li>wocao39</li>
        <li>wocao40</li>
        <li>wocao41</li>
        <li>wocao42</li>
        <li>wocao43</li>
        <li>wocao44</li>
        <li>wocao45</li>
        <li>wocao46</li>
        <li>wocao47</li>
        <li>wocao48</li>
        <li>wocao49</li>
        <li>wocao50</li>
      </ul>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'

export default {
  name: 'Profile',
  components: {
    Scroll
  }
}
</script>

<style scoped>
  .content {
    height: 300px;
    background-color: pink;
    overflow: hidden;
  }
</style>