<script setup>
import { useStore } from "./../stores/store.js";
import { ref, onMounted } from "vue";

const store = useStore();

const todoItems = ref(store.getData);
console.log(todoItems.value);
</script>

<template>
  <div class="heading">
    <h1 class="text-[48px] text-secondaryColor font-bold">Today</h1>
    <p class="text-[#414141] text-[18px]">4/6 completed</p>
  </div>
  <div class="mt-10 list-todo">
    <form action="">
      <div class="flex items-center form-group">
        <input type="checkbox" id="html" />
        <label for="html" class="flex items-center w-full">
          <div
            class="todo-content hover:bg-gray-100 hover:border-secondaryColor flex items-center ml-3 justify-between px-5 py-3 border border-[#E3E3E3] rounded-[8px] w-full"
          >
            <div class="content--text">
              <div class="todo__title text-[24px]">
                <h4>Cooking a salmon sushi</h4>
              </div>
              <div class="todo__description text-[#787878] text-[22px]">
                <h5>
                  Salmon and tuna i think is good for dinner, i wanna make it
                  today :D
                </h5>
              </div>
            </div>
            <div class="flex space-x-3 content--action">
              <!-- Modal toggle -->
              <button
                data-modal-target="authentication-modal"
                data-modal-toggle="authentication-modal"
                class="block text-white"
                type="button"
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M25.1908 3.1525C25.3426 3.3048 25.4279 3.51108 25.4279 3.72612C25.4279 3.94117 25.3426 4.14745 25.1908 4.29975L23.4959 5.99625L20.2459 2.74625L21.9408 1.04975C22.0931 0.897428 22.2998 0.811859 22.5152 0.811859C22.7307 0.811859 22.9373 0.897428 23.0896 1.04975L25.1908 3.15087V3.1525ZM22.347 7.1435L19.097 3.8935L8.0259 14.9662C7.93647 15.0557 7.86914 15.1647 7.82928 15.2847L6.52115 19.2075C6.49743 19.279 6.49406 19.3557 6.51142 19.429C6.52879 19.5024 6.5662 19.5694 6.61948 19.6227C6.67275 19.676 6.7398 19.7134 6.81312 19.7307C6.88644 19.7481 6.96314 19.7447 7.03465 19.721L10.9574 18.4129C11.0773 18.3735 11.1863 18.3067 11.2759 18.2179L22.347 7.14512V7.1435Z"
                    fill="#8E8E8E"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M1.625 21.9375C1.625 22.584 1.88181 23.204 2.33893 23.6611C2.79605 24.1182 3.41603 24.375 4.0625 24.375H21.9375C22.584 24.375 23.204 24.1182 23.6611 23.6611C24.1182 23.204 24.375 22.584 24.375 21.9375V12.1875C24.375 11.972 24.2894 11.7653 24.137 11.613C23.9847 11.4606 23.778 11.375 23.5625 11.375C23.347 11.375 23.1403 11.4606 22.988 11.613C22.8356 11.7653 22.75 11.972 22.75 12.1875V21.9375C22.75 22.153 22.6644 22.3597 22.512 22.512C22.3597 22.6644 22.153 22.75 21.9375 22.75H4.0625C3.84701 22.75 3.64035 22.6644 3.48798 22.512C3.3356 22.3597 3.25 22.153 3.25 21.9375V4.0625C3.25 3.84701 3.3356 3.64035 3.48798 3.48798C3.64035 3.3356 3.84701 3.25 4.0625 3.25H14.625C14.8405 3.25 15.0472 3.1644 15.1995 3.01202C15.3519 2.85965 15.4375 2.65299 15.4375 2.4375C15.4375 2.22201 15.3519 2.01535 15.1995 1.86298C15.0472 1.7106 14.8405 1.625 14.625 1.625H4.0625C3.41603 1.625 2.79605 1.88181 2.33893 2.33893C1.88181 2.79605 1.625 3.41603 1.625 4.0625V21.9375Z"
                    fill="#8E8E8E"
                  />
                </svg>
              </button>
              <button
                id="dropdownMenuIconHorizontalButton"
                data-dropdown-toggle="dropdownDotsHorizontal"
                class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-transparent rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                type="button"
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.875 15.4375C4.22853 15.4375 3.60855 15.1807 3.15143 14.7236C2.69431 14.2665 2.4375 13.6465 2.4375 13C2.4375 12.3535 2.69431 11.7335 3.15143 11.2764C3.60855 10.8193 4.22853 10.5625 4.875 10.5625C5.52147 10.5625 6.14145 10.8193 6.59857 11.2764C7.05569 11.7335 7.3125 12.3535 7.3125 13C7.3125 13.6465 7.05569 14.2665 6.59857 14.7236C6.14145 15.1807 5.52147 15.4375 4.875 15.4375ZM13 15.4375C12.3535 15.4375 11.7335 15.1807 11.2764 14.7236C10.8193 14.2665 10.5625 13.6465 10.5625 13C10.5625 12.3535 10.8193 11.7335 11.2764 11.2764C11.7335 10.8193 12.3535 10.5625 13 10.5625C13.6465 10.5625 14.2665 10.8193 14.7236 11.2764C15.1807 11.7335 15.4375 12.3535 15.4375 13C15.4375 13.6465 15.1807 14.2665 14.7236 14.7236C14.2665 15.1807 13.6465 15.4375 13 15.4375ZM21.125 15.4375C20.4785 15.4375 19.8585 15.1807 19.4014 14.7236C18.9443 14.2665 18.6875 13.6465 18.6875 13C18.6875 12.3535 18.9443 11.7335 19.4014 11.2764C19.8585 10.8193 20.4785 10.5625 21.125 10.5625C21.7715 10.5625 22.3915 10.8193 22.8486 11.2764C23.3057 11.7335 23.5625 12.3535 23.5625 13C23.5625 13.6465 23.3057 14.2665 22.8486 14.7236C22.3915 15.1807 21.7715 15.4375 21.125 15.4375Z"
                    fill="#8E8E8E"
                  />
                </svg>
              </button>

              <!-- Dropdown menu -->
              <div
                id="dropdownDotsHorizontal"
                class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
              >
                <ul
                  class="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownMenuIconHorizontalButton"
                >
                  <li>
                    <a
                      href="#"
                      class="flex px-4 py-2 text-[18px] text-secondaryColor hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      <svg
                        width="18"
                        class="mr-2"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_132_290)">
                          <path
                            d="M2.8125 1.125C2.51413 1.125 2.22798 1.24353 2.017 1.4545C1.80603 1.66548 1.6875 1.95163 1.6875 2.25V3.375C1.6875 3.67337 1.80603 3.95952 2.017 4.1705C2.22798 4.38147 2.51413 4.5 2.8125 4.5H3.375V14.625C3.375 15.2217 3.61205 15.794 4.03401 16.216C4.45597 16.6379 5.02826 16.875 5.625 16.875H12.375C12.9717 16.875 13.544 16.6379 13.966 16.216C14.3879 15.794 14.625 15.2217 14.625 14.625V4.5H15.1875C15.4859 4.5 15.772 4.38147 15.983 4.1705C16.194 3.95952 16.3125 3.67337 16.3125 3.375V2.25C16.3125 1.95163 16.194 1.66548 15.983 1.4545C15.772 1.24353 15.4859 1.125 15.1875 1.125H11.25C11.25 0.826631 11.1315 0.540483 10.9205 0.329505C10.7095 0.118526 10.4234 0 10.125 0L7.875 0C7.57663 0 7.29048 0.118526 7.0795 0.329505C6.86853 0.540483 6.75 0.826631 6.75 1.125H2.8125ZM6.1875 5.625C6.33668 5.625 6.47976 5.68426 6.58525 5.78975C6.69074 5.89524 6.75 6.03832 6.75 6.1875V14.0625C6.75 14.2117 6.69074 14.3548 6.58525 14.4602C6.47976 14.5657 6.33668 14.625 6.1875 14.625C6.03832 14.625 5.89524 14.5657 5.78975 14.4602C5.68426 14.3548 5.625 14.2117 5.625 14.0625V6.1875C5.625 6.03832 5.68426 5.89524 5.78975 5.78975C5.89524 5.68426 6.03832 5.625 6.1875 5.625ZM9 5.625C9.14918 5.625 9.29226 5.68426 9.39775 5.78975C9.50324 5.89524 9.5625 6.03832 9.5625 6.1875V14.0625C9.5625 14.2117 9.50324 14.3548 9.39775 14.4602C9.29226 14.5657 9.14918 14.625 9 14.625C8.85082 14.625 8.70774 14.5657 8.60225 14.4602C8.49676 14.3548 8.4375 14.2117 8.4375 14.0625V6.1875C8.4375 6.03832 8.49676 5.89524 8.60225 5.78975C8.70774 5.68426 8.85082 5.625 9 5.625ZM12.375 6.1875V14.0625C12.375 14.2117 12.3157 14.3548 12.2102 14.4602C12.1048 14.5657 11.9617 14.625 11.8125 14.625C11.6633 14.625 11.5202 14.5657 11.4148 14.4602C11.3093 14.3548 11.25 14.2117 11.25 14.0625V6.1875C11.25 6.03832 11.3093 5.89524 11.4148 5.78975C11.5202 5.68426 11.6633 5.625 11.8125 5.625C11.9617 5.625 12.1048 5.68426 12.2102 5.78975C12.3157 5.89524 12.375 6.03832 12.375 6.1875Z"
                            fill="#FF4F5A"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_132_290">
                            <rect width="18" height="18" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>

                      Delete</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </label>
      </div>
    </form>
    <!-- Main modal -->
    <div
      id="authentication-modal"
      tabindex="-1"
      aria-hidden="true"
      class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div class="relative w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-hide="authentication-modal"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
          <div class="px-6 py-6 lg:px-8">
            <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              Sign in to our platform
            </h3>
            <form class="space-y-6" action="#">
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Your email</label
                >
                <input
                  type="email"
                  name="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Your password</label
                >
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
              <div class="flex justify-between">
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="remember"
                      type="checkbox"
                      value=""
                      class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <label
                    for="remember"
                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >Remember me</label
                  >
                </div>
                <a
                  href="#"
                  class="text-sm text-blue-700 hover:underline dark:text-blue-500"
                  >Lost Password?</a
                >
              </div>
              <button
                type="submit"
                class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Login to your account
              </button>
              <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                Not registered?
                <a
                  href="#"
                  class="text-blue-700 hover:underline dark:text-blue-500"
                  >Create account</a
                >
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.form-group {
  margin-bottom: 15px;
}

.form-group input {
  padding: 0;
  height: initial;
  width: initial;
  margin-bottom: 0;
  display: none;
  cursor: pointer;
}

.form-group label {
  position: relative;
  cursor: pointer;
}

.form-group label:before {
  content: "";
  -webkit-appearance: none;
  background-color: #eaeaea;
  border-radius: 50px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
    inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
  padding: 10px;
  display: inline-block;
  position: relative;
  vertical-align: middle;
  cursor: pointer;
  margin-right: 5px;
}

.form-group input:checked + label:after {
  content: "";
  display: block;
  position: absolute;
  top: 35px;
  left: 9px;
  width: 9px;
  height: 17px;
  border: solid #ff4f5a;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
/* #dropdownDotsHorizontal {
  transform: translate(824px, 79px) !important;
} */
</style>
