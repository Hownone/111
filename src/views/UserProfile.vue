<template>
    <ContentBase>
        <div class="row">
            <div class="col-3">
                <UserProfileInfo @checkfollow="follow" @unfollow="unfollow" :user="info" />
                <UserProfileWrite @postApost="postApost" />

            </div>
            <div class="col-9">
                <UserProfilePosts :posts="posts">
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
import UserProfileWrite from '../components/UserProfileWrite.vue'


export default {
    name: 'UserProfile',
    components: {
        ContentBase,
        UserProfileInfo,
        UserProfilePosts,
        UserProfileWrite
    },
    setup() {
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

        });

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

        const postApost = (content) => {
            posts.count++;
            posts.posts.unshift({
                id: posts.count,
                userID: 12345,
                content: content,
            })
        }

        return {
            info: user,
            follow,
            unfollow,
            posts,
            postApost,
        }


    }
}
</script>

<style scoped>
</style>
