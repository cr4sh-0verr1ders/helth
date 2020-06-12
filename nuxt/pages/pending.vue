<template>
  <v-app id="scripting">
    <v-main>
      <v-container>
        <v-row
          justify="center"
          >
        <v-btn outlined to="/new" color="primary">New Prescription</v-btn>
        </v-row>
        <v-row
          v-for="entry in prescriptions"
          v-bind:key="entry.id"
          align="center"
          justify="center"
          ><v-col
            cols="12"
            sm="10"
            md="6"
            ><v-card @click="expand(entry.id)">
          <v-card-title>
            {{ entry.patient.givenname }} {{ entry.patient.surname }} &mdash; {{ entry.meds.name }}
          </v-card-title>
          <v-card-subtitle>
            Issued on 12 June 2020
            <template v-if="entry.meds.repeats > 0">
            &mdash; {{ entry.meds.repeats }} repeats left
            </template>
          </v-card-subtitle>
          <v-card-text>
            <p>
            {{ entry.meds.quantity }} of {{ entry.meds.name }}
            </p>
            <p v-if="entry.meds.reason">
            Reason: {{ entry.meds.reason }}
            </p>
          </v-card-text>
        </v-card></v-col></v-row>
      </v-container>
    </v-main>
  </v-app>
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
        repeats: ((Math.random() * 10) | 0),
        reason: "He was a bit sick",
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

    }
  },
  methods: {
    expand(id) {
      // TODO
      this.$router.push(`/details?id=${id}`);
    }
  }
}
</script>
