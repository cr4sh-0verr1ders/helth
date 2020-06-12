<template>
  <v-layout>
    <v-flex>
      <v-form>
        <v-container>
          <v-row><v-col><v-card>
            <v-card-title id="doc">
              <v-app-bar-nav-icon @click="show_doc = !show_doc"></v-app-bar-nav-icon>
              Provider Information
            </v-card-title>
            <v-container v-show="show_doc">
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="doc.hpi"
                    label="Healthcare Provider Idenfitier"
                    required
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="doc.foo"
                    label="Authorization reference number"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-text-field
                v-model="doc.name"
                label="Name"
                required
              ></v-text-field>
              <v-textarea
                v-model="doc.address"
                label="Address"
                required
              ></v-textarea>
              <v-text-field
                v-model="doc.phone"
                label="Phone Number"
                required
              ></v-text-field>
              <v-text-field
                v-model="doc.qualification"
                label="Specialist Qualification (if applicable)"
              ></v-text-field>
            </v-container>
          </v-card></v-col></v-row>

          <v-row><v-col><v-card>
            <v-card-title id="patient">
              <v-app-bar-nav-icon @click="show_patient = !show_patient"></v-app-bar-nav-icon>
              Patient: {{ patient.givenname }} {{ patient.surname }}
            </v-card-title>
            <v-container v-show="show_patient">
              <v-text-field
                v-model="patient.ihi"
                label="IHI (Individual Healthcare Identifier)"
              ></v-text-field>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="patient.givenname"
                    label="Given Name"
                    required
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="patient.surname"
                    label="Family Name"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="patient.dob"
                    label="Date of Birth"
                    required
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="patient.sex"
                    label="Sex"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-textarea
                v-model="patient.addr1"
                label="Address"
                required
              ></v-textarea>
              <v-text-field
                v-model="patient.phone"
                label="Mobile Number"
                required
              ></v-text-field>
              <v-text-field
                v-model="patient.email"
                label="Email Address"
                required
              ></v-text-field>
              <v-text-field
                v-model="patient.dva"
                label="DVA File Number (if applicable)"
              ></v-text-field>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="patient.medicare"
                    label="Medicare Number"
                    required
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="patient.medicare_irn"
                    label="IRN"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card></v-col></v-row>

          <v-row><v-col><v-card>
            <v-card-title id="meds">Prescription</v-card-title>
            <v-container>
              <v-text-field
                v-model="meds.name"
                label="Medication Name"
                required
              ></v-text-field>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="meds.strength"
                    label="Strength"
                    required
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="doc.quantity"
                    label="Quantity"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-textarea
                v-model="meds.usage"
                label="Directions for Use"
                required
              ></v-textarea>
              <v-textarea
                v-model="meds.reason"
                label="Prescription Reason"
                required
              ></v-textarea>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="meds.repeats"
                    label="Repeats"
                    required
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="doc.interval"
                    label="Repeat Interval"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>

            <v-card-actions>
              <v-spacer />
              <v-btn
                color="primary"
                @click="submit"
              >
                Submit
              </v-btn>
            </v-card-actions>
          </v-card></v-col></v-row>

        </v-container>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      doc: {},
      patient: {},
      meds: {},
      show_patient: true,
      show_doc: false,
    }
  }
}
</script>
