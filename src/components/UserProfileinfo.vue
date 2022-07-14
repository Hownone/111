<template>
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-5">
                    <img src="../assets/1.jpeg" class="img-fluid" alt="...">
                </div>
                <div class="col-9">
                    <div class="Username">{{ FullName }}</div>
                    <div class="fans">followers:{{ user.Followers }}</div>
                    <button @click="follow" v-if="!user.is_followed" type="button" class="btn btn-primary btn-sm">Follow</button>
                    <button @click="unfollow" v-if="user.is_followed" type="button" class="btn btn-primary btn-sm">Unfollow</button>

                </div>

            </div>

        </div>
    </div>

</template>

<script>
import { computed } from 'vue'

export default {
    name: "UserProfileInfo",
    props: {
        user: {
            type: Object,
            required: true,
        },
    },
    setup(props,context) {
        let FullName = computed(() => props.user.FirstName + ' ' + props.user.LastName);

        const follow = () => {
            
            context.emit('checkfollow');
        };

        const unfollow = () => {
            
            context.emit('unfollow');
        }

        return {
            FullName,
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