<template>
    <div class="card">
        <div class="card-body">
            <div v-for="post in posts.posts" :key="post.id">
                <div class="card OnePost">
                    <div class="card-body">
                        {{ post.content }}
                        <button @click="delete_a_post(post.id)" v-if="isMe" type="button"
                            class="btn btn-danger btn-sm">Delete</button>
                    </div>
                </div>
            </div>

        </div>


    </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'
import $ from 'jquery'



export default {
    name: "UserProfilePosts",
    props: {
        posts: {
            type: Object,
            required: true,
        },

        user: {
            type: Object,
            required: true,
        }
    },

    setup(props, context) {
        const store = useStore();

        const isMe = computed(() => store.state.user.id == props.user.id);

        const delete_a_post = postID => {

            $.ajax({
                url: "https://app165.acapp.acwing.com.cn/myspace/post/",
                type: "DELETE",
                data: {
                    post_id: postID,
                },
                headers: {
                    "Authorization": "Bearer " + store.state.user.access,
                },
                success(resp) {
                    if (resp.result == "success") {
                        context.emit("deletepost", postID);

                    }
                }
            });

        }


        return {
            isMe,
            delete_a_post,
        }
    }

}

</script>

<style scoped>
.OnePost {
    margin-bottom: 10px;
}

button {
    float: right;
}
</style>