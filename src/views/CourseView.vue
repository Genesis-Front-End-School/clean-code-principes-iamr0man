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
import CourseDetails from '@/components/pages/course/CourseDetails.vue';
import { courseGateway } from '@/gateway/courses.gateway';

export default defineComponent({
  components: {
    CourseDetails,
    Lessons,
    Container,
  },
  async setup() {
    const route = useRoute();
    const course = await courseGateway.getCourseById(route.params.id as string);

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
