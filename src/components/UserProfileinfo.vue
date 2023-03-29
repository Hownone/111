<template>
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-5">
                    <img :src="user.photo" class="img-fluid" alt="...">
                </div>
                <div class="col-9">
                    <div class="Username">{{ user.Username }}</div>
                    <div class="fans">followers:{{ user.Followers }}</div>
                    <button @click="follow" v-if="!user.is_followed" type="button"
                        class="btn btn-primary btn-sm">Follow</button>
                    <button @click="unfollow" v-if="user.is_followed" type="button"
                        class="btn btn-primary btn-sm">Unfollow</button>

                </div>

            </div>

        </div>
    </div>
</template>

<script>
//import { computed } from 'vue'
import $ from 'jquery'
import { useStore } from 'vuex';


export default {
    name: "UserProfileInfo",
    props: {
        user: {
            type: Object,
            required: true,
        },
    },
    setup(props, context) {
        //let FullName = computed(() => props.user.FirstName + ' ' + props.user.LastName);
        const store = useStore();
        const follow = () => {
            $.ajax({
                url: "https://app165.acapp.acwing.com.cn/myspace/follow/",
                type: "POST",
                data: {
                    target_id: props.user.id,
                },
                headers: {
                    "Authorization": "Bearer " + store.state.user.access,
                },
                success(resp) {
                    if (resp.result === "success") {
                        context.emit("checkfollow"); //触发父组件函数以更新父组件里的值
                    }
                }
            });
        };

        const unfollow = () => {
            $.ajax({
                url: "https://app165.acapp.acwing.com.cn/myspace/follow/",
                type: "POST",
                data: {
                    target_id: props.user.id,
                },
                headers: {
                    "Authorization": "Bearer " + store.state.user.access,
                },
                success(resp) {
                    if (resp.result === "success") {
                        context.emit("unfollow");
                    }
                }
            });

        };

        return {
            // FullName,
            follow,
            unfollow,
        }

    }
}
</script>

<style scoped>
img {
    border-radius: 50%;
}

.Username {
    font-weight: bold;
}

.fans {
    font-size: 12;
    color: rgb(180, 162, 170);
}

button {
    padding: 2px 5px;
    font-size: 12px;
}
</style>