<script setup>
import { useStore } from "./../stores/store.js";
import { ref, onMounted } from "vue";
import { initFlowbite } from "flowbite";

import Swal from "sweetalert2";

import axios from "axios";

const showAddTodo = ref(false);
const showAddTodoButton = ref(true);
const title = ref("");
const description = ref("");
const showDeleteButton = ref(false);
const showFormModal = ref(false);

const todoTitle = ref("");
const todoDescription = ref("");
const todoId = ref("");

const store = useStore();

const todoItems = ref([]);
const todoLength = ref(null);

const renderData = async () => {
  todoItems.value = await store.getData();
};

const renderLength = async () => {
  todoLength.value = await todoItems.length;
};

const toogleAddTodoForm = () => {
  showAddTodo.value = !showAddTodo.value;
  showAddTodoButton.value = !showAddTodoButton.value;
};

const addTodo = async () => {
  store.testingStoreAction();
  await store.addTodoStore(description.value, title.value);
  await renderData();
  await toogleAddTodoForm();
  title.value = "";
  description.value = "";
};

const getFormUpdate = (title, description, id) => {
  todoTitle.value = title;
  todoDescription.value = description;
  todoId.value = id;

  console.log(todoTitle.value, todoDescription.value, todoId.value);

  showFormModal.value = !showFormModal.value;

  console.log(showFormModal.value);

  // store.todoTitleStore = title;
  // store.todoDescriptionStore = description;
};

const updateTodo = () => {
  store.updateTodoStore(todoId.value, todoDescription.value, todoTitle.value);
  renderData();
  showFormModal.value = !showFormModal.value;
  // toogleAddTodoForm();
};

// get id property when click delete button use event.target.id
const deleteTodo = async (id, event) => {
  await store.deleteTodo(id);
  await renderData();
  await renderLength();
};

onMounted(async () => {
  await renderData();
  await initFlowbite();
  // console.log(todoItems.value);
});
</script>

<template>
  <div class="heading">
    <h1 class="text-[48px] text-secondaryColor font-bold">Today</h1>
    <p class="text-[#414141] text-[18px]">4/{{ todoItems.length }} completed</p>
  </div>

  <div v-if="todoLength == 0" class="mt-10 list-todo">
    <div
      href="#"
      class="block w-full p-6 border rounded-lg shadow bg-secondaryColor border-secondaryColor"
    >
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-center text-white">
        No Todo
      </h5>
    </div>

    <form v-if="showAddTodo">
      <div class="">
        <input
          type="text"
          v-model="title"
          id="title"
          class="bg-[#E7E7E7] text-black border border-gray-300 text-lg font-bold rounded-lg focus:ring-secondaryColor focus:border-secondaryColor block w-full p-2.5"
          placeholder="Task title"
          required
        />
      </div>
      <div class="mb-6">
        <textarea
          id="message"
          v-model="description"
          rows="4"
          class="bg-[#E7E7E7] text-black border border-gray-300 text-lg rounded-lg focus:ring-secondaryColor focus:border-secondaryColor block w-full p-2.5"
          placeholder="Description"
        ></textarea>
      </div>
      <div class="flex space-x-2 buttonAddTodo">
        <button
          @click.prevent="addTodo"
          type="submit"
          class="text-white bg-secondaryColor focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Submit
        </button>
        <button
          @click.prevent="showAddTodo = !showAddTodo"
          type="submit"
          class="text-secondaryColor bg-transparent border-secondaryColor border-2 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Cancel
        </button>
      </div>
    </form>

    <button
      @click.prevent="showAddTodo = !showAddTodo"
      type="button"
      :class="showAddTodo ? 'hidden' : 'block'"
      class="text-secondaryColor font-medium rounded-lg text-lg py-2.5 space-x-5 flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2"
    >
      <svg
        class="mr-5"
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13 25.25C19.7655 25.25 25.25 19.7655 25.25 13C25.25 6.2345 19.7655 0.75 13 0.75C6.2345 0.75 0.75 6.2345 0.75 13C0.75 19.7655 6.2345 25.25 13 25.25ZM12.125 8.625C12.125 8.39294 12.2172 8.17038 12.3813 8.00628C12.5454 7.84219 12.7679 7.75 13 7.75C13.2321 7.75 13.4546 7.84219 13.6187 8.00628C13.7828 8.17038 13.875 8.39294 13.875 8.625V12.125H17.375C17.6071 12.125 17.8296 12.2172 17.9937 12.3813C18.1578 12.5454 18.25 12.7679 18.25 13C18.25 13.2321 18.1578 13.4546 17.9937 13.6187C17.8296 13.7828 17.6071 13.875 17.375 13.875H13.875V17.375C13.875 17.6071 13.7828 17.8296 13.6187 17.9937C13.4546 18.1578 13.2321 18.25 13 18.25C12.7679 18.25 12.5454 18.1578 12.3813 17.9937C12.2172 17.8296 12.125 17.6071 12.125 17.375V13.875H8.625C8.39294 13.875 8.17038 13.7828 8.00628 13.6187C7.84219 13.4546 7.75 13.2321 7.75 13C7.75 12.7679 7.84219 12.5454 8.00628 12.3813C8.17038 12.2172 8.39294 12.125 8.625 12.125H12.125V8.625Z"
          fill="#FF4F5A"
        />
      </svg>

      Add Task
    </button>
  </div>
  <div class="mt-10 list-todo" v-else>
    <form action="">
      <div
        class="flex items-center form-group"
        v-for="item in todoItems"
        :key="item.id"
      >
        <input type="checkbox" :id="item._id" />
        <label :for="item._id" class="flex items-center w-full">
          <div
            :id="item._id"
            class="todo-content hover:bg-gray-100 hover:border-secondaryColor flex items-center ml-3 justify-between px-5 py-3 border border-[#E3E3E3] rounded-[8px] w-full"
          >
            <div class="content--text">
              <div class="todo__title text-[24px]">
                <h4>{{ item.title }}</h4>
              </div>
              <div class="todo__description text-[#787878] text-[22px]">
                <h5>
                  {{ item.description }}
                </h5>
              </div>
            </div>
            <div class="flex space-x-3 content--action">
              <!-- Modal toggle -->
              <button
                class="block text-white"
                @click="getFormUpdate(item.title, item.description, item._id)"
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

              <!-- Dropdown menu -->
              <div
                class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
              >
                <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
                  <li>
                    <a
                      :id="item._id"
                      @click="deleteTodo(item._id, $event)"
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

    <form v-if="showAddTodo">
      <div class="">
        <input
          type="text"
          v-model="title"
          id="title"
          class="bg-[#E7E7E7] text-black border border-gray-300 text-lg font-bold rounded-lg focus:ring-secondaryColor focus:border-secondaryColor block w-full p-2.5"
          placeholder="Task title"
          required
        />
      </div>
      <div class="mb-6">
        <textarea
          id="message"
          v-model="description"
          rows="4"
          class="bg-[#E7E7E7] text-black border border-gray-300 text-lg rounded-lg focus:ring-secondaryColor focus:border-secondaryColor block w-full p-2.5"
          placeholder="Description"
        ></textarea>
      </div>
      <div class="flex space-x-2 buttonAddTodo">
        <button
          @click.prevent="addTodo"
          type="submit"
          class="text-white bg-secondaryColor focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Submit
        </button>
        <button
          @click.prevent="showAddTodo = !showAddTodo"
          type="submit"
          class="text-secondaryColor bg-transparent border-secondaryColor border-2 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Cancel
        </button>
      </div>
    </form>

    <button
      @click.prevent="showAddTodo = !showAddTodo"
      type="button"
      :class="showAddTodo ? 'hidden' : 'block'"
      class="text-secondaryColor font-medium rounded-lg text-lg py-2.5 space-x-5 flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2"
    >
      <svg
        class="mr-5"
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13 25.25C19.7655 25.25 25.25 19.7655 25.25 13C25.25 6.2345 19.7655 0.75 13 0.75C6.2345 0.75 0.75 6.2345 0.75 13C0.75 19.7655 6.2345 25.25 13 25.25ZM12.125 8.625C12.125 8.39294 12.2172 8.17038 12.3813 8.00628C12.5454 7.84219 12.7679 7.75 13 7.75C13.2321 7.75 13.4546 7.84219 13.6187 8.00628C13.7828 8.17038 13.875 8.39294 13.875 8.625V12.125H17.375C17.6071 12.125 17.8296 12.2172 17.9937 12.3813C18.1578 12.5454 18.25 12.7679 18.25 13C18.25 13.2321 18.1578 13.4546 17.9937 13.6187C17.8296 13.7828 17.6071 13.875 17.375 13.875H13.875V17.375C13.875 17.6071 13.7828 17.8296 13.6187 17.9937C13.4546 18.1578 13.2321 18.25 13 18.25C12.7679 18.25 12.5454 18.1578 12.3813 17.9937C12.2172 17.8296 12.125 17.6071 12.125 17.375V13.875H8.625C8.39294 13.875 8.17038 13.7828 8.00628 13.6187C7.84219 13.4546 7.75 13.2321 7.75 13C7.75 12.7679 7.84219 12.5454 8.00628 12.3813C8.17038 12.2172 8.39294 12.125 8.625 12.125H12.125V8.625Z"
          fill="#FF4F5A"
        />
      </svg>

      Add Task
    </button>
    <!-- Main modal -->
    <div
      :class="
        showFormModal
          ? 'fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0  max-h-full justify-center items-center flex bg-black bg-opacity-50 h-screen'
          : ' fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full justify-center items-center hidden'
      "
    >
      <div class="relative w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            @click.prevent="showFormModal = !showFormModal"
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
                  v-model="todoTitle"
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
                  v-model="todoDescription"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>

              <button
                type="submit"
                @click.prevent="updateTodo"
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

.showDeleteButton {
  position: absolute;
  inset: 0px auto auto 0px;
  margin: 0px;
}

.hiddenDeleteButton {
  position: absolute;
  inset: 0px auto auto 0px;
  margin: 0px;
}

/*.showModalForm {
  fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full justify-center items-center flex

  fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full justify-center items-center hidden
} */
/* #dropdownDotsHorizontal {
  transform: translate(824px, 79px) !important;
} */
</style>
