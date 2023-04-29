<template>
  <Container>
    <CourseBody :course="course" />
    <Lessons :course="course" />
  </Container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import Container from '@/components/ui/Container.vue';
import Lessons from '@/components/lesson/Lessons.vue';
import { api } from '@/api/api';
import CourseBody from '@/components/course-details/CourseBody.vue';

export default defineComponent({
  components: {
    CourseBody,
    Lessons,
    Container,
  },
  async setup() {
    const route = useRoute();
    const course = await api.getCourseById(route.params.id as string);

    if (course.isSuccess) {
      return {
        course: course.response,
      };
    }

    return {
      course: null,
    };
  },
});
</script>
