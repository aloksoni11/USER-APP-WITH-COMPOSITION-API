import { computed, ref, watch } from 'vue';

export default function useFilter(
  listData,
  currentPage = 1,
  numberPerPage = 10,
  customFilterObj = {},
) {
  const currentPageClone = ref(currentPage);
  const filterKeys = Object.keys(customFilterObj);

  // filter function as per data function
  const filterUsersBySelect = computed(() => listData.filter(
    (item) => filterKeys.every((eachKey) => {
      if (!customFilterObj[eachKey].value.length) {
        return true;
      }

      return (item[eachKey].toLowerCase().includes(customFilterObj[eachKey].value.toLowerCase())
        || customFilterObj[eachKey].value === 'All');
    }),
  ));

  // slice data as per page
  const sliceFilterUsers = computed(
    () => {
      const begin = (currentPageClone.value - 1) * numberPerPage.value;
      const end = begin + numberPerPage.value;

      return filterUsersBySelect.value.slice(begin, end);
    },
  );

  // handle pagination
  const totalPage = computed(() => {
    const usersLength = filterUsersBySelect.value.length;
    if (usersLength / numberPerPage.value) {
      let totalPages = usersLength / numberPerPage.value;
      if (totalPages % 1 !== 0) {
        totalPages += 1;
        return Math.floor(totalPages);
      }
      return totalPages;
    }
    return 1;
  });

  // watching 'total' computed property
  watch(totalPage, () => {
    currentPageClone.value = 1;
  });

  // returning data and pagination
  return {
    sliceFilterUsers, totalPage,
  };
}
