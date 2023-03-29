<template>
    <ContentBase>
        <div class="row">
            <div class="col-3">
                <UserProfileInfo @checkfollow="follow" @unfollow="unfollow"
                    :user="info" />
                <UserProfileWrite v-if="isMe" @postApost="postApost" />

            </div>
            <div class="col-9">
                <UserProfilePosts :user="info" :posts="posts"
                    @deletepost="DeletePost">
                </UserProfilePosts>
            </div>
        </div>
    </ContentBase>
</template>

<script>
import ContentBase from '@/components/ContentBase.vue'
import UserProfileInfo from '@/components/UserProfileinfo.vue'
import UserProfilePosts from '@/components/UserProfilePosts.vue'
import { reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import UserProfileWrite from '../components/UserProfileWrite.vue'
import $ from 'jquery'
import { computed } from '@vue/reactivity'


export default {
    name: 'UserProfile',
    components: {
        ContentBase,
        UserProfileInfo,
        UserProfilePosts,
        UserProfileWrite
    },
    setup() {
        const route = useRoute();
        const userID = route.params.ID;
        const store = useStore();
        const user = reactive({});
        const posts = reactive({});
        //获取用户信息
        $.ajax({
            url: "https://app165.acapp.acwing.com.cn/myspace/getinfo/",
            type: "GET",
            data: {
                user_id: userID,
            },
            headers: {
                "Authorization": "Bearer " + store.state.user.access,
            },
            success(resp) {
                //console.log(resp);
                user.id = resp.id;
                user.Username = resp.username;
                user.photo = resp.photo;
                user.Followers = resp.followerCount;
                user.is_followed = resp.is_followed;
            }
        });

        //获取用户帖子
        $.ajax({
            url: "https://app165.acapp.acwing.com.cn/myspace/post/",
            type: "GET",
            data: {
                user_id: userID,
            },
            headers: {
                "Authorization": "Bearer " + store.state.user.access,
            },
            success(resp) {
                posts.count = resp.length;
                //console.log(resp);
                posts.posts = resp;
            }
        });
        /* console.log(userID);
         const user = reactive({
             Username: "Hownone Ho",
             LastName: "Ho",
             FirstName: "Hownone",
             Followers: 100,
             is_followed: true,
         });
 
         const posts = reactive({
             count: 3,
             posts: [{
                 id: 1,
                 userID: 12345,
                 content: "rp ++"
             },
             {
                 id: 2,
                 userID: 12345,
                 content: "rating ++"
             },
             {
                 id: 3,
                 userID: 12345,
                 content: "grandmaster"
             },
             ]
 
         });*/

        const follow = () => {
            if (user.is_followed) return;
            user.is_followed = true;
            user.Followers++;

        }

        const unfollow = () => {
            if (!user.is_followed) return;
            user.is_followed = false;
            user.Followers--;
        }

        const postApost = content => {
            posts.count++;
            posts.posts.unshift({
                id: posts.count,
                content: content,
            })
        }

        const DeletePost = postID => {
            posts.posts = posts.posts.filter(post => post.id !== postID);
            posts.count = posts.posts.length;
        }

        const isMe = computed(() => userID == store.state.user.id)

        return {
            info: user,
            follow,
            unfollow,
            posts,
            postApost,
            isMe,
            DeletePost,
        }


    }
}
</script>

<style scoped></style>
