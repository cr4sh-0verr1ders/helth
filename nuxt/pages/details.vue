<template>
  <v-app id="scripting">
    <v-main>
      <v-container>
        <v-row
          justify="center"
          >
          <v-btn text icon to="/pending">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <h2>{{ patient.givenname }} {{ patient.surname }} &mdash; {{ meds.name }}</h2>
        </v-row>
        <v-row
          justify="center"
          >
          <h3>
            Issued on 12 June 2020
            <template v-if="meds.repeats > 0">
            &mdash; {{ meds.repeats }} repeats left
            </template>
          </h3>
        </v-row>
        <v-row
          justify="center"
          >
          <v-btn outlined :to="link_new" color="primary">New Prescription</v-btn>
          <v-btn outlined :to="link_repeat" color="primary">Issue Repeat</v-btn>
        </v-row>
        <v-row
          v-for="(fields, heading) in groups"
          align="center"
          justify="center"
          >
          <v-col
            cols="12"
            sm="10"
            md="6"
            >
            <v-card>
              <v-card-title>
                {{ heading }}
              </v-card-title>
              <v-card-text>
                <v-simple-table>
                  <tbody>
                    <tr v-for="(item, label) in fields">
                      <td>{{ label }}</td>
                      <td>{{ item }}</td>
                    </tr>
                  </tbody>
                </v-simple-table>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {

    let id = +this.$route.query.id;

    let meds = {
      name: "Placebo",
    };
    let patient = {
      givenname: "Joe",
      surname: "Smith",
    };
    let doc = {
    };

    let fields = {
      "Medication": {
        "Medication Name":                  meds.name,
        "Strength":                         meds.strength,
        "Quantity":                         meds.quantity,
        "Directions for Use":               meds.usage,
        "Prescription Reason":              meds.reason,
        "Repeats":                          meds.repeats,
        "Repeat Interval":                  meds.interval,
      },
      "Patient": {
        "Individual Healthcare Identifier": patient.ihi,
        "Given Name":                       patient.givenname,
        "Family Name":                      patient.surname,
        "Date of Birth":                    patient.dob,
        "Sex":                              patient.sex,
        "Address":                          patient.addr1,
        "Mobile Number":                    patient.phone,
        "Email Address":                    patient.email,
        "DVA File Number":                  patient.dva,
        "Medicare Number":                  patient.medicare,
        "IRN":                              patient.medicare_irn,
      },
      "Provider": {
        "Healthcare Provider Idenfitier":   doc.hpi,
        "Authorization reference number":   doc.auth_ref,
        "Name":                             doc.name,
        "Address":                          doc.address,
        "Phone Number":                     doc.phone,
        "Specialist Qualification":         doc.qualification,
      }
    };

    return {
      groups: fields,
      patient: patient,
      doc: doc,
      meds: meds,
      id: id,
      link_new: `/new?doc=${id}&patient=${id}`,
      link_repeat: `/new?doc=${id}&patient=${id}&meds=${id}`,
    }
  },
  methods: {
  }
}
</script>
