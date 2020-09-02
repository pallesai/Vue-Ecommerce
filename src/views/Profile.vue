<template>
    <div class="products">
        <Loading v-if="loading" />
        <div class="container">

            <div class="intro h-100">
                <div class="row h-100 align-items-center">
                    <div class="col-md-6 ml-3">
                        <h3>Profile settings</h3>
                        <p>
                            Change your profile settings here
                        </p>
                    </div>
                    <div class="col-md-5">
                        <img src="/img/svg/profile.svg" width="300" alt="" class="img-fluid">
                    </div>
                </div>
            </div>


            <div class="profile-content">

                <ul class="nav nav-pills ml-3" id="myTab" role="tablist">

                    <li class="nav-item">
                        <a class="nav-link active" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="true">Profile</a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link"  id="account-tab" data-toggle="tab" href="#account" role="tab" aria-controls="account" aria-selected="false">Account settings</a>
                    </li>

                </ul>

                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active pt-3" id="profile" role="tabpanel" aria-labelledby="profile-tab">

                        <div class="container">
                            <div class="row">

                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="">Full name</label>
                                        <input type="text" v-model="profile.name" placeholder="Full name" class="form-control">
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="">Phone number</label>
                                        <input type="tel" v-model="profile.phone" placeholder="Phone" class="form-control">
                                    </div>
                                </div>

                                <div class="col-md-8">
                                    <div class="form-group">
                                        <label for="">Address</label>
                                        <input type="text" v-model="profile.address" placeholder="Address" class="form-control">
                                    </div>
                                </div>

                                <div class="col-md-8">
                                    <div class="form-group">
                                        <label for="">Postal code</label>
                                        <input type="text" name="postcode" v-model="profile.postcode" placeholder="Postcode" class="form-control">
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group">
                                        <input type="submit" @click="updateProfile" value="Save Changes" class="btn btn-outline-info w-100">
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                    <div class="tab-pane fade pt-3" id="account" role="tabpanel" aria-labelledby="account-tab">
                        <div class="container">
                            <div class="row">

                                <div class="col-md-8">
                                    <div class="form-group">
                                        <label for="">Username</label>
                                        <input type="text" v-model="account.displayName" placeholder="User name" class="form-control">
                                    </div>
                                </div>

                                <div class="col-md-8">
                                    <div class="input-group">
                                        <div class="custom-file">
                                            <input @change="uploadImage" type="file" class="custom-file-input" id="inputGroupFile01"
                                                   aria-describedby="inputGroupFileAddon01">
                                            <label class="custom-file-label" for="inputGroupFile01">Profile Image</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-6 mt-4">
                                    <div class="form-group">
                                        <input type="submit" @click="updateAccount" value="Update your profile" class="btn btn-outline-info w-100">
                                    </div>
                                </div>

                                <div class="col-md-6 mt-4">
                                    <div class="form-group">
                                        <input type="button" @click="resetPassword" value="Reset password" class="btn btn-outline-danger w-100">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <hr class="col-xs-12 mt-5">
            </div>

        </div>
    </div>
</template>

<script>
import firebase from '../firebase';
import { db } from '../firebase';
// import $ from 'jquery';
import Loading from "../components/Loading";

export default {
    name: 'Profile',
    data () {
        return {
            profile: {
                name: null,
                phone: null,
                address: null,
                postcode: null
            },
            account: {
                displayName: null,
                email: null,
                photoURL: null,
            },
            loading: null,
        }
    },
    components: {
        Loading,
    },
    firestore () {
        const user = firebase.auth().currentUser;
        console.log("User ", user);
        return {
            profile: db.collection('profiles').doc(user.uid)
        }
    },

    methods: {

        updateAccount () {
          const user = firebase.auth().currentUser;

          this.loading = true;
          user.updateProfile({
              displayName: this.account.displayName,
              photoURL: this.account.photoURL
          }).then(() => {
              this.loading = false;
              window.Toast.fire({
                  icon: 'success',
                  title: 'Your account was updated successfully!'
              });
          }).catch(err => {
             console.error(err);
          });
        },

        resetPassword () {
            const auth = firebase.auth();
            this.loading = true;

            auth.sendPasswordResetEmail(auth.currentUser.email)
            .then(() => {
                this.loading = false;
                window.Toast.fire({
                    icon: 'success',
                    title: 'Email to reset your password was sent!'
                });
            })
            .catch(err => console.error(err));
        },

        updateProfile () {
            this.loading = true;
            console.log("Current profile ", this.$firestore);
            this.$firestore.profile.update(Object.assign({}, this.profile))
            .then(() => {
                this.loading = false;
                window.Toast.fire({
                    icon: 'success',
                    title: 'Your profile was updated successfully!'
                });
            })
            .catch((err) => console.log(err));
        },

        uploadImage (event) {

            if(!event.target.files[0]){
                return;
            }

            let file = event.target.files[0];
            let storageRef = firebase.storage().ref('profileImg/'+ Math.random() + '_'  + file.name);

            this.loading = true;
            let uploadTask = storageRef.put(file);

            uploadTask.on('state_changed', (snapshot) => {
                console.log(snapshot);
            }, (error) => {
                console.log(error);
            }, () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    this.loading = false;
                    this.account.photoURL = downloadURL;
                });
            });
        },
    },
    created () {
        let user = firebase.auth().currentUser;
        this.account.displayName = user.displayName;
        this.account.photoURL = user.photoURL;
        this.account.email = user.email;
    }
  
}
</script>

<style scoped>

</style>
