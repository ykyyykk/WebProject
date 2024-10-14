import { shallowMount } from "@vue/test-utils";
import { createStore } from "vuex";
import axios from "axios";
import Login from "../src/pages/Login.vue";

jest.mock("axios");

describe("Login.vue", () => {
  let actions;
  let store;

  beforeEach(() => {
    actions = {
      SetLogin: jest.fn(),
    };
    store = createStore({
      actions,
    });
  });

  it("calls login API and handles successful response", async () => {
    const wrapper = shallowMount(Login, {
      global: {
        plugins: [store],
      },
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

  it("handles login failure", async () => {
    const wrapper = shallowMount(Login, {
      global: {
        plugins: [store],
      },
      data() {
        return {
          email: "test@example.com",
          password: "wrongpassword",
        };
      },
    });

    axios.post.mockRejectedValue(new Error("Login failed"));

    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

    await wrapper.vm.Login();

    expect(axios.post).toHaveBeenCalledWith(expect.any(String), {
      email: "test@example.com",
      password: "wrongpassword",
    });
    expect(alertMock).toHaveBeenCalledWith(
      expect.stringContaining("帳號或密碼錯誤")
    );
  });
});
