import { computed, ref, watch } from 'vue';

export default function useFilter(
  listData, searchQuery, currentPage = 1, numberPerPage = 10, selectedRole = 'All', selectedPlan = 'All',
) {
  const currentPageClone = ref(currentPage);

  // filter data by input query
  const filterUsers = computed(() => listData.filter(
    (item) => item.fullName.toLowerCase().indexOf(searchQuery.value) > -1
        || item.email.toLowerCase().indexOf(searchQuery.value) > -1,
  ));

  // filter data by selected role and selected plan
  const filterUsersBySelect = computed(() => filterUsers.value.filter(
    (item) => (selectedRole.value === 'All' ? true : item.role.toLowerCase() === selectedRole.value.toLowerCase())
      && (selectedPlan.value === 'All' ? true : item.currentPlan.toLowerCase() === selectedPlan.value.toLowerCase()),
  ));

  // slice data as per page
  const sliceFilterUsers = computed(
    () => {
      const begin = (currentPageClone.value - 1) * numberPerPage.value;
      const end = begin + numberPerPage.value;

      return filterUsersBySelect.value.slice(begin, end);
    },
  );

  // watching number per page
  watch(numberPerPage, () => {
    currentPageClone.value = 1;
  });

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

  // returning data and pagination
  return {
    sliceFilterUsers, totalPage,
  };
}
