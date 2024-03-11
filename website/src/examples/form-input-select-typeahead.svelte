<script>
	import FormErrors from '@design-system/svelte/FormErrors.svelte';
	import Form from '@design-system/svelte/element/form.svelte';
	import FieldOption from '@design-system/svelte/FieldOption.svelte';
	import InputSelect from '@design-system/svelte/InputSelect.svelte';
	import Button from '@design-system/svelte/element/button.svelte';
</script>

<!-- TODO Add in lang support -->
<!-- TODO Add in icon support -->
<Form method="POST">
	<InputSelect id="select-pewc" label="Select" hint="Just type" is="ds-select">
		<FieldOption label="Afghanistan" value="AF" />
		<FieldOption label="Åland Islands" value="AX" />
		<FieldOption label="Albania" value="AL" />
		<FieldOption label="Algeria" value="DZ" />
		<FieldOption label="American Samoa" value="AS" />
		<FieldOption label="Andorra" value="AD" />
		<FieldOption label="Angola" value="AO" />
		<FieldOption label="Anguilla" value="AI" />
		<FieldOption label="Antarctica" value="AQ" />
		<FieldOption label="Antigua and Barbuda" value="AG" />
		<FieldOption label="Argentina" value="AR" />
		<FieldOption label="Armenia" value="AM" />
		<FieldOption label="Aruba" value="AW" />
		<FieldOption label="Australia" value="AU" />
		<FieldOption label="Austria" value="AT" />
		<FieldOption label="Azerbaijan" value="AZ" />
		<FieldOption label="Bahamas" value="BS" />
		<FieldOption label="Bahrain" value="BH" />
		<FieldOption label="Bangladesh" value="BD" />
		<FieldOption label="Barbados" value="BB" />
		<FieldOption label="Belarus" value="BY" />
		<FieldOption label="Belgium" value="BE" />
		<FieldOption label="Belize" value="BZ" />
		<FieldOption label="Benin" value="BJ" />
		<FieldOption label="Bermuda" value="BM" />
		<FieldOption label="Bhutan" value="BT" />
		<FieldOption label="Bolivia, Plurinational State of" value="BO" />
		<FieldOption label="Bonaire, Sint Eustatius and Saba" value="BQ" />
		<FieldOption label="Bosnia and Herzegovina" value="BA" />
		<FieldOption label="Botswana" value="BW" />
		<FieldOption label="Bouvet Island" value="BV" />
		<FieldOption label="Brazil" value="BR" />
		<FieldOption label="British Indian Ocean Territory" value="IO" />
		<FieldOption label="Brunei Darussalam" value="BN" />
		<FieldOption label="Bulgaria" value="BG" />
		<FieldOption label="Burkina Faso" value="BF" />
		<FieldOption label="Burundi" value="BI" />
		<FieldOption label="Cambodia" value="KH" />
		<FieldOption label="Cameroon" value="CM" />
		<FieldOption label="Canada" value="CA" />
		<FieldOption label="Cape Verde" value="CV" />
		<FieldOption label="Cayman Islands" value="KY" />
		<FieldOption label="Central African Republic" value="CF" />
		<FieldOption label="Chad" value="TD" />
		<FieldOption label="Chile" value="CL" />
		<FieldOption label="China" value="CN" />
		<FieldOption label="Christmas Island" value="CX" />
		<FieldOption label="Cocos (Keeling) Islands" value="CC" />
		<FieldOption label="Colombia" value="CO" />
		<FieldOption label="Comoros" value="KM" />
		<FieldOption label="Congo" value="CG" />
		<FieldOption label="Congo, the Democratic Republic of the" value="CD" />
		<FieldOption label="Cook Islands" value="CK" />
		<FieldOption label="Costa Rica" value="CR" />
		<FieldOption label="Côte d'Ivoire" value="CI" />
		<FieldOption label="Croatia" value="HR" />
		<FieldOption label="Cuba" value="CU" />
		<FieldOption label="Curaçao" value="CW" />
		<FieldOption label="Cyprus" value="CY" />
		<FieldOption label="Czech Republic" value="CZ" />
		<FieldOption label="Denmark" value="DK" />
		<FieldOption label="Djibouti" value="DJ" />
		<FieldOption label="Dominica" value="DM" />
		<FieldOption label="Dominican Republic" value="DO" />
		<FieldOption label="Ecuador" value="EC" />
		<FieldOption label="Egypt" value="EG" />
		<FieldOption label="El Salvador" value="SV" />
		<FieldOption label="Equatorial Guinea" value="GQ" />
		<FieldOption label="Eritrea" value="ER" />
		<FieldOption label="Estonia" value="EE" />
		<FieldOption label="Ethiopia" value="ET" />
		<FieldOption label="Falkland Islands (Malvinas)" value="FK" />
		<FieldOption label="Faroe Islands" value="FO" />
		<FieldOption label="Fiji" value="FJ" />
		<FieldOption label="Finland" value="FI" />
		<FieldOption label="France" value="FR" />
		<FieldOption label="French Guiana" value="GF" />
		<FieldOption label="French Polynesia" value="PF" />
		<FieldOption label="French Southern Territories" value="TF" />
		<FieldOption label="Gabon" value="GA" />
		<FieldOption label="Gambia" value="GM" />
		<FieldOption label="Georgia" value="GE" />
		<FieldOption label="Germany" value="DE" />
		<FieldOption label="Ghana" value="GH" />
		<FieldOption label="Gibraltar" value="GI" />
		<FieldOption label="Greece" value="GR" />
		<FieldOption label="Greenland" value="GL" />
		<FieldOption label="Grenada" value="GD" />
		<FieldOption label="Guadeloupe" value="GP" />
		<FieldOption label="Guam" value="GU" />
		<FieldOption label="Guatemala" value="GT" />
		<FieldOption label="Guernsey" value="GG" />
		<FieldOption label="Guinea" value="GN" />
		<FieldOption label="Guinea-Bissau" value="GW" />
		<FieldOption label="Guyana" value="GY" />
		<FieldOption label="Haiti" value="HT" />
		<FieldOption label="Heard Island and McDonald Islands" value="HM" />
		<FieldOption label="Holy See (Vatican City State)" value="VA" />
		<FieldOption label="Honduras" value="HN" />
		<FieldOption label="Hong Kong" value="HK" />
		<FieldOption label="Hungary" value="HU" />
		<FieldOption label="Iceland" value="IS" />
		<FieldOption label="India" value="IN" />
		<FieldOption label="Indonesia" value="ID" />
		<FieldOption label="Iran, Islamic Republic of" value="IR" />
		<FieldOption label="Iraq" value="IQ" />
		<FieldOption label="Ireland" value="IE" />
		<FieldOption label="Isle of Man" value="IM" />
		<FieldOption label="Israel" value="IL" />
		<FieldOption label="Italy" value="IT" />
		<FieldOption label="Jamaica" value="JM" />
		<FieldOption label="Japan" value="JP" />
		<FieldOption label="Jersey" value="JE" />
		<FieldOption label="Jordan" value="JO" />
		<FieldOption label="Kazakhstan" value="KZ" />
		<FieldOption label="Kenya" value="KE" />
		<FieldOption label="Kiribati" value="KI" />
		<FieldOption label="Korea, Democratic People's Republic of" value="KP" />
		<FieldOption label="Korea, Republic of" value="KR" />
		<FieldOption label="Kuwait" value="KW" />
		<FieldOption label="Kyrgyzstan" value="KG" />
		<FieldOption label="Lao People's Democratic Republic" value="LA" />
		<FieldOption label="Latvia" value="LV" />
		<FieldOption label="Lebanon" value="LB" />
		<FieldOption label="Lesotho" value="LS" />
		<FieldOption label="Liberia" value="LR" />
		<FieldOption label="Libya" value="LY" />
		<FieldOption label="Liechtenstein" value="LI" />
		<FieldOption label="Lithuania" value="LT" />
		<FieldOption label="Luxembourg" value="LU" />
		<FieldOption label="Macao" value="MO" />
		<FieldOption label="Macedonia, the former Yugoslav Republic of" value="MK" />
		<FieldOption label="Madagascar" value="MG" />
		<FieldOption label="Malawi" value="MW" />
		<FieldOption label="Malaysia" value="MY" />
		<FieldOption label="Maldives" value="MV" />
		<FieldOption label="Mali" value="ML" />
		<FieldOption label="Malta" value="MT" />
		<FieldOption label="Marshall Islands" value="MH" />
		<FieldOption label="Martinique" value="MQ" />
		<FieldOption label="Mauritania" value="MR" />
		<FieldOption label="Mauritius" value="MU" />
		<FieldOption label="Mayotte" value="YT" />
		<FieldOption label="Mexico" value="MX" />
		<FieldOption label="Micronesia, Federated States of" value="FM" />
		<FieldOption label="Moldova, Republic of" value="MD" />
		<FieldOption label="Monaco" value="MC" />
		<FieldOption label="Mongolia" value="MN" />
		<FieldOption label="Montenegro" value="ME" />
		<FieldOption label="Montserrat" value="MS" />
		<FieldOption label="Morocco" value="MA" />
		<FieldOption label="Mozambique" value="MZ" />
		<FieldOption label="Myanmar" value="MM" />
		<FieldOption label="Namibia" value="NA" />
		<FieldOption label="Nauru" value="NR" />
		<FieldOption label="Nepal" value="NP" />
		<FieldOption label="Netherlands" value="NL" />
		<FieldOption label="New Caledonia" value="NC" />
		<FieldOption label="New Zealand" value="NZ" />
		<FieldOption label="Nicaragua" value="NI" />
		<FieldOption label="Niger" value="NE" />
		<FieldOption label="Nigeria" value="NG" />
		<FieldOption label="Niue" value="NU" />
		<FieldOption label="Norfolk Island" value="NF" />
		<FieldOption label="Northern Mariana Islands" value="MP" />
		<FieldOption label="Norway" value="NO" />
		<FieldOption label="Oman" value="OM" />
		<FieldOption label="Pakistan" value="PK" />
		<FieldOption label="Palau" value="PW" />
		<FieldOption label="Palestinian Territory, Occupied" value="PS" />
		<FieldOption label="Panama" value="PA" />
		<FieldOption label="Papua New Guinea" value="PG" />
		<FieldOption label="Paraguay" value="PY" />
		<FieldOption label="Peru" value="PE" />
		<FieldOption label="Philippines" value="PH" />
		<FieldOption label="Pitcairn" value="PN" />
		<FieldOption label="Poland" value="PL" />
		<FieldOption label="Portugal" value="PT" />
		<FieldOption label="Puerto Rico" value="PR" />
		<FieldOption label="Qatar" value="QA" />
		<FieldOption label="Réunion" value="RE" />
		<FieldOption label="Romania" value="RO" />
		<FieldOption label="Russian Federation" value="RU" />
		<FieldOption label="Rwanda" value="RW" />
		<FieldOption label="Saint Barthélemy" value="BL" />
		<FieldOption label="Saint Helena, Ascension and Tristan da Cunha" value="SH" />
		<FieldOption label="Saint Kitts and Nevis" value="KN" />
		<FieldOption label="Saint Lucia" value="LC" />
		<FieldOption label="Saint Martin (French part)" value="MF" />
		<FieldOption label="Saint Pierre and Miquelon" value="PM" />
		<FieldOption label="Saint Vincent and the Grenadines" value="VC" />
		<FieldOption label="Samoa" value="WS" />
		<FieldOption label="San Marino" value="SM" />
		<FieldOption label="Sao Tome and Principe" value="ST" />
		<FieldOption label="Saudi Arabia" value="SA" />
		<FieldOption label="Senegal" value="SN" />
		<FieldOption label="Serbia" value="RS" />
		<FieldOption label="Seychelles" value="SC" />
		<FieldOption label="Sierra Leone" value="SL" />
		<FieldOption label="Singapore" value="SG" />
		<FieldOption label="Sint Maarten (Dutch part)" value="SX" />
		<FieldOption label="Slovakia" value="SK" />
		<FieldOption label="Slovenia" value="SI" />
		<FieldOption label="Solomon Islands" value="SB" />
		<FieldOption label="Somalia" value="SO" />
		<FieldOption label="South Africa" value="ZA" />
		<FieldOption label="South Georgia and the South Sandwich Islands" value="GS" />
		<FieldOption label="South Sudan" value="SS" />
		<FieldOption label="Spain" value="ES" />
		<FieldOption label="Sri Lanka" value="LK" />
		<FieldOption label="Sudan" value="SD" />
		<FieldOption label="Suriname" value="SR" />
		<FieldOption label="Svalbard and Jan Mayen" value="SJ" />
		<FieldOption label="Swaziland" value="SZ" />
		<FieldOption label="Sweden" value="SE" />
		<FieldOption label="Switzerland" value="CH" />
		<FieldOption label="Syrian Arab Republic" value="SY" />
		<FieldOption label="Taiwan, Province of China" value="TW" />
		<FieldOption label="Tajikistan" value="TJ" />
		<FieldOption label="Tanzania, United Republic of" value="TZ" />
		<FieldOption label="Thailand" value="TH" />
		<FieldOption label="Timor-Leste" value="TL" />
		<FieldOption label="Togo" value="TG" />
		<FieldOption label="Tokelau" value="TK" />
		<FieldOption label="Tonga" value="TO" />
		<FieldOption label="Trinidad and Tobago" value="TT" />
		<FieldOption label="Tunisia" value="TN" />
		<FieldOption label="Turkey" value="TR" />
		<FieldOption label="Turkmenistan" value="TM" />
		<FieldOption label="Turks and Caicos Islands" value="TC" />
		<FieldOption label="Tuvalu" value="TV" />
		<FieldOption label="Uganda" value="UG" />
		<FieldOption label="Ukraine" value="UA" />
		<FieldOption label="United Arab Emirates" value="AE" />
		<FieldOption label="United Kingdom" value="GB" />
		<FieldOption label="United States" value="US" />
		<FieldOption label="United States Minor Outlying Islands" value="UM" />
		<FieldOption label="Uruguay" value="UY" />
		<FieldOption label="Uzbekistan" value="UZ" />
		<FieldOption label="Vanuatu" value="VU" />
		<FieldOption label="Venezuela, Bolivarian Republic of" value="VE" />
		<FieldOption label="Viet Nam" value="VN" />
		<FieldOption label="Virgin Islands, British" value="VG" />
		<FieldOption label="Virgin Islands, U.S." value="VI" />
		<FieldOption label="Wallis and Futuna" value="WF" />
		<FieldOption label="Western Sahara" value="EH" />
		<FieldOption label="Yemen" value="YE" />
		<FieldOption label="Zambia" value="ZM" />
		<FieldOption label="Zimbabwe" value="ZW" />
	</InputSelect>
	<Button>Submit</Button>
</Form>
