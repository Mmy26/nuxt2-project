import { doc, getFirestore, setDoc } from "firebase/firestore";
import firebase from "../../plugins/firebase";

export default {
  namespaced: true,

  state: {
    // ユーザー一覧
    userList: [],
    // 現在ログイン中のユーザー
    loginUser: {
      id: 0,
      fullName1: "",
      fullName2: "",
      zipcode: "",
      prefecture: "",
      address: "",
      mailAddress: "",
      telephone: "",
      password: "",
    },
  },

  actions: {
    /**
     * ユーザー情報をfirebaseに登録する.
     * @param {*} context - コンテキスト
     * @param {*} payload - ユーザー情報
     */
    async registerUser(context, payload) {
      const db = getFirestore(firebase);
      try {
        const docRef = await setDoc(
          doc(db, "ユーザー一覧", String(payload.id)),
          {
            id: payload.id,
            fullName1: payload.fullName1,
            fullName2: payload.fullName2,
            zipcode: payload.zipcode,
            prefecture: payload.prefecture,
            address: payload.address,
            mailAddress: payload.mailAddress,
            telephone: payload.telephone,
            password: payload.password,
          }
        );
        console.log(docRef);

        // vuexにも保存する
        context.commit("setUser", payload);
      } catch (error) {
        console.error(error);
      }
    },
  },

  mutations: {
    /**
     * ユーザー情報をstateに格納.
     * @param {*} state - ステート
     * @param {*} payload - ユーザー情報のオブジェクト
     */
    setUser(state, payload) {
      state.userList.push(payload);
    },
    /**
     * ログイン中のユーザー情報をstateに格納.
     * @param {*} state - ステート
     */
    registerLoginUser(state) {
      state.loginUser = state.userList[0];
    },
    /**
     * ログイン中のユーザー情報をstateから削除する（ログアウト）.
     * @param {*} state - ステート
     */
    deleteLoginUser(state) {
      state.loginUser = {
        id: 0,
        fullName1: "",
        fullName2: "",
        zipcode: "",
        prefecture: "",
        address: "",
        mailAddress: "",
        telephone: "",
        password: "",
      };
    },
  },

  getters: {
    /**
     * ユーザー一覧を取得.
     * @param {*} state - ステート
     * @returns ユーザー一覧
     */
    getUserList(state) {
      return state.userList;
    },
    getLoginUser(state) {
      return state.loginUser;
    },
  },
};
