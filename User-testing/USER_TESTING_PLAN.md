# RFID Rabbit Shelter Tracking System - User Testing Plan

## Testing Session Overview

**Date:** Thursday  
**Start Time:** 12:30 PM  
**Duration:** 1 hour (60 minutes)  
**Platforms:** Mobile (3 users × 10 minutes) + Web App (3 users)  
**Total Participants:** 6 users

---

## Pre-Test Setup & Materials

### Required Materials

- [ ] Pre-defined user accounts with login credentials (email/password)
- [ ] RFID card for testing participant
- [ ] Pre-defined animal data for creation tests
- [ ] Pre-filled forms for update scenarios
- [ ] ESP32 RFID reader/scanner device (separate hardware)
- [ ] Test animals with RFID tags
- [ ] Mobile devices (iOS/Android) for mobile testing
- [ ] Computers/tablets for web app testing

### Test Environment Setup

- [ ] Ensure stable internet connection
- [ ] Have backup devices ready
- [ ] Prepare screen recording software (optional)
- [ ] Create observer notes templates
- [ ] Set up testing space with adequate lighting

---

## Core Test Scenarios

### 1. Authentication & Access Control

**Objective:** Verify users can successfully log into the web/mobile app

**Test Steps:**

1. Provide user with pre-defined email/password credentials
2. Ask user to sign into their account using the web/mobile app
3. Observe login process and note any difficulties
4. Explain that RFID functionality uses separate hardware device

**Note:** RFID scanning is handled by a separate ESP32 microcontroller device, not through the web/mobile app directly

**Success Criteria:**

- [ ] User successfully logs in with email/password within 2 attempts
- [ ] Login process feels intuitive
- [ ] User understands that RFID is separate hardware
- [ ] Authentication works consistently across platforms

---

### 2. Navigation & Core Interface

**Objective:** Ensure users can comfortably navigate between main application areas

**Test Areas:**

- **Dashboard** - Overview and main entry point
- **Animals** - Animal management and records
- **Scan Log** - RFID activity history
- **User Profile** - Personal account settings

**Test Steps:**

1. Ask user to explore each of the 4 main pages
2. Have them navigate between sections freely
3. Ask them to return to Dashboard from any page
4. Observe navigation patterns and hesitations

**Success Criteria:**

- [ ] User can locate all 4 main sections
- [ ] Navigation feels intuitive and logical
- [ ] User doesn't get lost or confused
- [ ] Back/home navigation is clear

---

### 3. Animal Management - Create New Animal

**Objective:** Test animal creation workflow with provided data

**Pre-Test Setup:**

- Prepare standardised animal data for each tester to use
- Include: Name, species, age, health status, intake date

**Test Steps:**

1. Provide tester with pre-defined animal data
2. Ask them to create a new animal record
3. Guide them through required fields
4. Have them save the new animal

**Success Criteria:**

- [ ] User can locate "Create Animal" function
- [ ] Form fields are clear and understandable
- [ ] User successfully saves animal record
- [ ] Data validation works appropriately

---

### 4. Animal Management - View & Search

**Objective:** Test animal viewing, searching, and filtering capabilities

**Test Steps:**

1. Ask user to view the created animal in the animals table
2. Have them search for a specific animal by name
3. Test filtering functionality (by species, status, etc.)
4. Ask them to view detailed animal information

**Success Criteria:**

- [ ] User can find their created animal in the table
- [ ] Search functionality works as expected
- [ ] Filters help narrow down results effectively
- [ ] Animal details are clearly displayed

---

### 5. Animal Management - Update Records

**Objective:** Test updating existing animal information

**Pre-Test Setup:**

- Have pre-filled update forms ready
- Identify specific animals for update testing

**Test Steps:**

1. Ask user to select an animal to update
2. Provide them with updated information to enter
3. Have them save the changes
4. Verify changes are reflected in the system

**Success Criteria:**

- [ ] User can locate and access update function
- [ ] Update form is intuitive and clear
- [ ] Changes save successfully
- [ ] Updated information displays correctly

---

### 6. RFID Hardware Integration - Scanning & Real-time Updates

**Objective:** Test RFID hardware device and real-time web app integration

**Test Steps:**

1. Provide user with ESP32 RFID scanner device (separate hardware)
2. Ask them to scan their personal RFID card on the device to activate
3. Observe real-time connection activation in the web app
4. Ask them to scan an animal RFID tag using the hardware device
5. Have them assign the scanned tag to a new animal in the web app
6. Test scanning the same animal tag again to read animal info
7. Observe real-time updates appearing in the web app from hardware scans

**Success Criteria:**

- [ ] Personal RFID card activation on hardware device works
- [ ] Real-time connection between hardware and web app activates
- [ ] Animal RFID scanning on hardware device works reliably
- [ ] Scan data appears in web app in real-time
- [ ] Tag assignment to animals through web app is straightforward
- [ ] Re-scanning provides correct animal information
- [ ] Hardware device feedback (OLED/audio) is helpful and clear

---

### 7. Session Management - Sign Out

**Objective:** Ensure users can properly exit the system

**Test Steps:**

1. Ask user to sign out of their account
2. Verify they are returned to login screen
3. Confirm session is properly terminated

**Success Criteria:**

- [ ] Sign out function is easily locatable
- [ ] User is properly logged out
- [ ] Cannot access protected areas after logout

---

## Testing Schedule

### Mobile Testing (30 minutes)

- **User 1:** 12:30-12:40 PM (10 minutes)
- **User 2:** 12:40-12:50 PM (10 minutes)
- **User 3:** 12:50-1:00 PM (10 minutes)

### Web App Testing (30 minutes)

- **User 4:** 1:00-1:10 PM (10 minutes)
- **User 5:** 1:10-1:20 PM (10 minutes)
- **User 6:** 1:20-1:30 PM (10 minutes)

---

## Evaluation Criteria

### Usability Metrics

- **Task Completion Rate:** % of users who complete each task successfully
- **Time to Completion:** Average time for each core task
- **Error Rate:** Number of errors/wrong clicks per task
- **User Satisfaction:** Post-test satisfaction rating (1-5 scale)

### Qualitative Observations

- **Navigation Patterns:** How users move through the interface
- **Confusion Points:** Where users hesitate or get stuck
- **Positive Feedback:** What users find intuitive or helpful
- **Improvement Suggestions:** Direct user feedback for enhancements

---

## Observer Notes Template

### For Each Test Session:

**User:** [Mobile/Web] User #**\_  
**Start Time:** \_\_\_**  
**End Time:** **\_**

#### Task Performance:

- [ ] **Login:** ✅ Success / ❌ Struggled / ⏱️ Time: \_\_\_
- [ ] **Navigation:** ✅ Intuitive / ❌ Confused / Notes: \_\_\_
- [ ] **Create Animal:** ✅ Completed / ❌ Issues / Notes: \_\_\_
- [ ] **View/Search:** ✅ Successful / ❌ Problems / Notes: \_\_\_
- [ ] **Update Animal:** ✅ Completed / ❌ Difficulties / Notes: \_\_\_
- [ ] **RFID Scanning:** ✅ Worked Well / ❌ Issues / Notes: \_\_\_
- [ ] **Sign Out:** ✅ Successful / ❌ Problems / Notes: \_\_\_

#### Overall Feedback:

**Most Positive Aspect:** ******\_\_\_******  
**Biggest Challenge:** ******\_\_\_******  
**Suggested Improvements:** ******\_\_\_******  
**Overall Rating (1-5):** \_\_\_

---

## Post-Testing Analysis

### Immediate Actions (Complete within 24 hours)

- [ ] Compile all observer notes
- [ ] Calculate completion rates for each task
- [ ] Identify top 3 usability issues
- [ ] Document critical bugs or blockers

### Priority Issues Assessment

**High Priority (Fix Before Launch):**

- Issues preventing task completion
- Major navigation problems
- Critical RFID functionality failures

**Medium Priority (Next Sprint):**

- User confusion points
- Interface improvements
- Enhanced user feedback

**Low Priority (Future Enhancement):**

- Nice-to-have features
- Minor UI polish
- Advanced functionality requests

### Success Metrics

- **Target:** 80%+ task completion rate
- **Target:** Average user satisfaction ≥ 4/5
- **Target:** No critical blocking issues

---

## Tips for Conducting the Test

### During Testing:

1. **Stay Neutral:** Don't guide users unless they're completely stuck
2. **Think Aloud:** Encourage users to verbalize their thought process
3. **Observe Body Language:** Note frustration, confusion, or confidence
4. **Take Detailed Notes:** Capture exact quotes and specific behaviors
5. **Time Management:** Keep sessions on schedule but don't rush users

### Common Pitfalls to Avoid:

- Leading users to solutions
- Explaining how features "should" work
- Interrupting user's natural workflow
- Focussing only on successful completions
- Ignoring emotional responses

---

_This document should be updated throughout the testing process with actual results and observations._
