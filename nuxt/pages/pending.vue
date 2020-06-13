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
            {{ entry.patient_givenname }} {{ entry.patient_surname }} &mdash; {{ entry.meds_name }}
          </v-card-title>
          <v-card-subtitle>
            Issued on 12 June 2020
            <template v-if="entry.meds_repeats > 0">
            &mdash; {{ entry.meds_repeats }} repeats left
            </template>
          </v-card-subtitle>
          <v-card-text>
            <p>
            {{ entry.meds_quantity }} of {{ entry.meds_name }}
            </p>
            <p v-if="entry.meds_reason">
            Reason: {{ entry.meds_reason }}
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
    this.$axios.$get("/api/test", { withCredentials: true }).then(dat => {
      console.log("tested");
    });
    this.$axios.$get("/api/queryPres", { withCredentials: true }).then(oids => {
      console.log(oids);
      let reqs = oids.map(oid => {
        return this.$axios.$post("/api/viewPres", { presID: oid, withCredentials: true }).then(record => {
          record.id = oid;
          return record;
        });
      });
      Promise.all(reqs).then(records => {
        this.data.prescriptions = records;
      });
    });

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
