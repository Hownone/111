<template>
  <ContentBase>
    <div class="card" v-for="user in users" :key="user.id" @click="OpenUserProfile(user.id)">
      <div class="card-body">
        <div class="row">
          <div class="col-1">
            <img :src="user.photo" class="img-fluid" alt="">
          </div>
          <div class="col-10">
            <div class="cc">
              <div class="username">{{ user.username }}</div>
              <div class="followers">
                <span class="text"> {{ user.followerCount }} </span> followers
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ContentBase>
</template>

<script>
import ContentBase from '@/components/ContentBase'
import router from '@/router';
import $ from 'jquery';
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'UserList',
  components: {
    ContentBase,
  },
  setup() {
    let users = ref([]);
    const store = useStore();

    $.ajax({
      //url: 'https://api.bilibili.com/x/relation/followers?vmid=2884629&pn=1&ps=20&order=desc&jsonp=jsonp',
      url: 'https://app165.acapp.acwing.com.cn/myspace/userlist/',
      type: "get",
      success(resp) {
        users.value = resp;
      }
    });

    const OpenUserProfile = userID => {
      if (store.state.user.is_login) {
        router.push({
          name: "userprofile",
          params: {
            ID: userID,
          }
        });
      }
      else {
        router.push({
          name: "login"
        });
      }
    }


    return {
      users,
      OpenUserProfile,
    }

  }
}
</script>

<style scoped>
img {
  border-radius: 50%;
}

.cc {
  float: left;
  height: 50%;
}
.username {
  font-weight: bold;
 
}

.text {
  font-weight: bold;
  color: black;
}

.followers {
  font-size: 15px;
  color: rgb(180, 162, 170);
 
}

.card {
  margin-bottom: 20px;
  cursor: pointer;
}

.card:hover {
  box-shadow: 2px 2px 10px lightgrey;
  transform: 500ms;
}
</style>
