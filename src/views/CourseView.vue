<template>
  <Container>
    <CourseDetails :course="course" />
    <Lessons :course="course" />
  </Container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import Container from '@/components/ui/Container.vue';
import Lessons from '@/components/pages/course/lesson/Lessons.vue';
import { api } from '@/api/api';
import CourseDetails from '@/components/pages/course/CourseDetails.vue';

export default defineComponent({
  components: {
    CourseDetails,
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
