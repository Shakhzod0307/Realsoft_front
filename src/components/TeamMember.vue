<template>
  <div id="team" class="team-section">
    <div class="team-header">
      <p class="title" id="team_title" ref="Title">{{title}}</p>
      <p class="text" ref="Text" v-html="heading"></p>
    </div>

    <!-- Team Grid -->
    <div class="team-grid">
      <div ref="TeamMembers" id="team_member" class="team-item" v-for="(team,index) in Teams" :key="index">
        <img :src="`http://localhost:8000${team.image}`" alt="...">
        <div class="team-item-text">
          <h4 >{{team.name}}</h4>
          <p>{{team.position}}</p>
        </div>
      </div>

    </div>

    <!-- All Team  -->
    <div class="all-team-grid">
      <div ref="AllTeamMembers" class="all-team" v-for="(team,index) in AllTeams" :key="index">
        <img :src="`http://localhost:8000${team.image}`" alt="...">
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, onUnmounted} from "vue";
import axios from "axios";

const Title = ref(null);
const Text = ref(null);
const TeamMembers = ref([]);
const AllTeamMembers = ref([]);
const searchQuery = ref('');
const title = ref('');
const heading = ref('');
const Teams = ref([]);
const AllTeams = ref([]);

let observers = [];
const createObserver = (element, className) => {
  return new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(className);
          } else {
            entry.target.classList.remove(className);
          }
        });
      },
      { threshold: 0.1 }
  );
};

const getAllTeams = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/get-teams', {
      params: { search: searchQuery.value }
    });
    const allTeams = response.data.data;
    // console.log(allTeams);
    Teams.value = allTeams.filter(team => team.type === 'full');
    AllTeams.value = allTeams.filter(team => team.type === 'only-image');

  } catch (error) {
    console.error("Failed to fetch teams:", error);
  }
};
const fetchText = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/get-texts');
    const texts = response.data.data.filter(text => text.type === 'team')[0];
    title.value = texts.title;
    heading.value = texts.heading;
    // console.log(texts);
  } catch (error) {
    console.error(error);
  }
};


onMounted(async ()=>{
  await getAllTeams();
  await fetchText();
  if (Title.value) {
    const observerTitle = createObserver(Title.value, "animate-title");
    observerTitle.observe(Title.value);
    observers.push(observerTitle);
  }
  if (Text.value) {
    const observerText = createObserver(Text.value, "animate-text");
    observerText.observe(Text.value);
    observers.push(observerText);
  }
  if (TeamMembers.value) {
    TeamMembers.value.forEach((member) => {
      if (member) {
        const observerMember = createObserver(member, "animate-teams");
        observerMember.observe(member);
        observers.push(observerMember);
      }
    });
  }
  if (AllTeamMembers.value) {
    AllTeamMembers.value.forEach((member) => {
      if (member) {
        const observerMember = createObserver(member, "animate-all-teams");
        observerMember.observe(member);
      }
    })
  }

})
onUnmounted(()=>{
  observers.forEach((observer) => observer.disconnect());
})

</script>

<style scoped>

.team-section {
  padding: 40px 90px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.team-header {
  text-align: start;
  align-items: start;
}

.title {
  text-transform: uppercase;
  color: #778191;
  display: inline-flex;
  padding: 6px 12px;
  align-items: start;
  gap: 10px;
  border-radius: 40px;
  border: 1px solid #DFE4ED;
  background:  #EFF3F9;
  backdrop-filter: blur(5px);
  margin-bottom: 20px;
  opacity: 0;
  transition: opacity 1s ease-out, transform 1s ease-out;
  transform: translateX(90px);
}
.title.animate-title{
  opacity: 1;
  transform: translateX(0);
}

.text {
  color: #555;
  font-family: "Museo Sans Cyrl",Arial, sans-serif;
  font-size: 35px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-transform: uppercase;
  padding-bottom: 10px;
  opacity: 0;
  transition: opacity 1.5s ease-out, transform 1.5s ease-out;
  transform: translateX(90px);
}
.text.animate-text{
  opacity: 1;
  transform: translateX(0);
}

::v-deep(.text span ){
  color:  #007BFC;
  font-family: "Museo Sans Cyrl",Arial, sans-serif;
  font-size: 35px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-skip-ink: none;
  text-decoration-thickness: auto;
  text-underline-offset: auto;
  text-underline-position: from-font;
  text-transform: uppercase;
}


.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
}
.team-item{
  max-width: 350px;
  /*opacity: 0;*/
  transition: opacity 1s ease-out, transform 1s ease-out;
  transform: translateX(-90px);
}
.team-item.animate-teams{
  opacity: 1;
  transform: translateX(0);
}
.team-item-text{
  text-align: start;
  padding: 20px 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  background-color: #f9f9f9;
}
.team-item img {
  width: 100%;
  height: auto;
  border-radius: 15px;
}
.team-item img:hover{
  border-radius: 0;
  border-bottom: 4px solid #2856ef;
}
.team-item h4 {
  font-size: 18px;
  margin: 10px 0 5px;
}

.team-item p {
  font-size: 14px;
  color: #555;
}


.all-team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 20px;
  justify-content: center;
}

.all-team {
  /*opacity: 0;*/
  transition: opacity 1s ease-out, transform 1s ease-out;
  transform: translateX(90px);
}
.all-team.animate-all-teams{
  opacity: 1;
  transform: translateX(0);
}
.all-team img {
  width: 100%;
  border-radius: 50%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

@media (max-width: 1450px) {
  .team-grid {
    grid-template-columns: repeat(3, 1fr);
    grid-auto-flow: dense;
    row-gap: 10px;
  }
}
@media (max-width: 950px) {
  .team-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-flow: dense;
    row-gap: 10px;
  }
  .title,
  .text,
  ::v-deep(.text span){
    font-size: 24px;
  }
}

/* Responsive Design */
@media (max-width: 680px) {
  .team-item-text{
    width: auto;
    height: 110px;
    padding: 10px;
  }
  .team-section{
    padding: 50px 20px;
  }

  .all-team img {
    width: 60px;
    height: 60px;
  }

}
@media (max-width: 480px){
  .team-grid {
    grid-template-columns: repeat(1, 1fr);
    grid-auto-flow: dense;
    row-gap: 10px;
  }
  .team-section{
    padding: 10px 28px;
  }
  .all-team-grid{
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-left: 30px;
  }
  .title,
  .text,
  ::v-deep(.text span){
    font-size: 16px;
  }


}
</style>