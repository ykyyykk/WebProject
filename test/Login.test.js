import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import axios from "axios";
import Login from "@/pages/Login.vue";

jest.mock("axios");

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Login.vue", () => {
  let actions;
  let store;

  beforeEach(() => {
    actions = {
      SetLogin: jest.fn(),
    };
    store = new Vuex.Store({
      actions,
    });
  });

  it("呼叫 /login API and handles successful response", async () => {
    const wrapper = shallowMount(Login, {
      store,
      localVue,
      data() {
        return {
          email: "e",
          password: "p",
        };
      },
    });

    const mockResponse = {
      data: {
        success: true,
        user: { id: 1, name: "Test User" },
      },
    };
    axios.post.mockResolvedValue(mockResponse);

    await wrapper.vm.Login();

    expect(axios.post).toHaveBeenCalledWith(expect.any(String), {
      email: "e",
      password: "p",
    });
    expect(actions.SetLogin).toHaveBeenCalledWith(expect.anything(), {
      user: mockResponse.data.user,
    });
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "user",
      JSON.stringify(mockResponse.data.user)
    );
  });

  it("如果call /login 失敗", async () => {
    const wrapper = shallowMount(Login, {
      store,
      localVue,
      data() {
        return {
          email: "錯誤的email",
          password: "錯誤的password",
        };
      },
    });

    const mockResponse = {
      data: {
        success: false,
        message: "找不到使用者",
      },
    };
    axios.post.mockRejectedValue(new Error("登入失敗"));

    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

    await wrapper.vm.Login();

    expect(axios.post).toHaveBeenCalledWith(expect.any(String), {
      email: "錯誤的email2",
      password: "錯誤的密碼2",
    });
    expect(alertMock).toHaveBeenCalledWith(
      expect.stringContaining("帳號或密碼錯誤")
    );
  });
});
