<template>
  <v-layout>
    <v-flex>
      <v-container>
        <v-btn outlined to="/new" color="primary">New Prescription</v-btn>
        <v-row v-for="entry in prescriptions" v-bind:key="entry.id"><v-col><v-card @click="expand()">
          <v-card-title>
            {{ entry.patient.givenname }} {{ entry.patient.surname }} &mdash; {{ entry.meds.name }} ({{ entry.meds.quantity }})
          </v-card-title>
          <v-card-subtitle>
            Issued on {{ entry.meds.issuedate }}
            <template v-if="entry.meds.repeats > 0">
            &mdash; {{ entry.meds.repeats }} repeats left
            </template>
          </v-card-subtitle>
          <v-card-text>
            Lorem Ipsum Eos est eius cumque. Illum officiis est neque error consequatur eius rerum et. Sint sit quia officiis eum.
          </v-card-text>
        </v-card></v-col></v-row>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {

    let filler = () => ({
      id: (Math.random() * 10) | 0,
      patient: {
        givenname: "John",
        surname: "Smith",
      },
      meds: {
        name: "Medicine",
        quantity: ((Math.random() * 10) | 0) + " milligrams",
        issuedate: "2020-06-12",
        repeats: ((Math.random() * 10) | 0)
      },
    });

    return {
      prescriptions: [
        filler(),
        filler(),
        filler(),
        filler(),
        filler(),
      ],

      expand() {
        // TODO
      }
    }
  }
}
</script>
