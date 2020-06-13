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
          <h2>{{ record.patient_givenname }} {{ record.patient_surname }} &mdash; {{ record.meds_name }}</h2>
        </v-row>
        <v-row
          justify="center"
          >
          <h3>
            Issued on 12 June 2020
            <template v-if="record.meds_repeats > 0">
            &mdash; {{ record.meds_repeats }} repeats left
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
import axios from 'axios'

export default {
  data() {
    let id = this.$route.query.id;
    console.log(id, this);

    this.$axios.$post('/api/viewPres', { presID: id }).then(record => {

    let fields = {
      "Medication": {
        "Medication Name":                  record.meds_name,
        "Strength":                         record.meds_strength,
        "Quantity":                         record.meds_quantity,
        "Directions for Use":               record.meds_usage,
        "Prescription Reason":              record.meds_reason,
        "Repeats":                          record.meds_repeats,
        "Repeat Interval":                  record.meds_interval,
      },
      "Patient": {
        "Individual Healthcare Identifier": record.patient_ihi,
        "Given Name":                       record.patient_givenname,
        "Family Name":                      record.patient_surname,
        "Date of Birth":                    record.patient_dob,
        "Sex":                              record.patient_sex,
        "Address":                          record.patient_addr1,
        "Mobile Number":                    record.patient_phone,
        "Email Address":                    record.patient_email,
        "DVA File Number":                  record.patient_dva,
        "Medicare Number":                  record.patient_medicare,
        "IRN":                              record.patient_medicare_irn,
      },
      "Provider": {
        "Healthcare Provider Idenfitier":   record.doc_hpi,
        "Authorization reference number":   record.doc_auth_ref,
        "Name":                             record.doc_name,
        "Address":                          record.doc_address,
        "Phone Number":                     record.doc_phone,
        "Specialist Qualification":         record.doc_qualification,
      }
    };

      this.groups = fields;
      this.record = record;
      console.log(this);
  })
    return {
      record: {},
      groups: {},
      id: id,
      link_new: `/new?doc=${id}&patient=${id}`,
      link_repeat: `/new?doc=${id}&patient=${id}&meds=${id}`,
    }
  }
}
</script>
