#  Copyright 2019 IBM
#
#   Licensed under the Apache License, Version 2.0 (the "License");
#   you may not use this file except in compliance with the License.
#   You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
#   Unless required by applicable law or agreed to in writing, software
#   distributed under the License is distributed on an "AS IS" BASIS,
#   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#   See the License for the specific language governing permissions and
#   limitations under the License.

FROM nginx:stable
LABEL maintainer="dwakeman@us.ibm.com"

COPY dist/ibm-cloud-utility /usr/share/nginx/html


# support running as arbitrary user which belogs to the root group
RUN chmod g+rwx /var/cache/nginx /var/run /var/log/nginx
# users are not allowed to listen on priviliged ports
RUN sed -i.bak 's/listen\(.*\)80;/listen 8080;/' /etc/nginx/conf.d/default.conf
EXPOSE 8080
# comment user directive as master process is run as user in OpenShift anyhow
RUN sed -i.bak 's/^user/#user/' /etc/nginx/nginx.conf


#RUN apk update && apk upgrade

# Install the application
#ADD package.json /app/package.json
#RUN cd /app && npm install
#COPY app.js /app/app.js

# Support to for arbitrary UserIds
# https://docs.openshift.com/container-platform/3.11/creating_images/guidelines.html#openshift-specific-guidelines
#RUN chmod -R u+x /usr/share/nginx/html && \
#    chgrp -R 0 /usr/share/nginx/html && \
#RUN   chmod -R g=u /usr/share/nginx/html /etc/passwd /var/cache /var/run

#RUN chmod -R u+x /var/cache && \
#    chgrp -R 0 /var/cache && \
#    chmod -R g=u /var/cache

#RUN chmod -R u+x /var/run && \
#    chgrp -R 0 /var/run && \
#   chmod -R g=u /var/run


#WORKDIR /app

#ENV PORT 8080
#EXPOSE 8080

# Vulnerability Advisor : Fix PASS_MAX_DAYS, PASS_MIN_DAYS and PASS_MIN_LEN, common-password
# RUN mv -f /etc/login.defs /etc/login.defs.orig
# RUN sed 's/^PASS_MAX_DAYS.*/PASS_MAX_DAYS 90/' /etc/login.defs.orig > /etc/login.defs
# RUN grep -q '^PASS_MIN_DAYS' /etc/login.defs && sed -i 's/^PASS_MIN_DAYS.*/PASS_MIN_DAYS 1/' /etc/login.defs || echo 'PASS_MIN_DAYS 1\n' >> /etc/login.defs
# RUN grep -q '^PASS_MIN_LEN' /etc/login.defs && sed -i 's/^PASS_MIN_LEN.*/PASS_MIN_LEN 8/' /etc/login.defs || echo 'PASS_MIN_LEN 9\n' >> /etc/login.defs
# RUN grep -q '^password.*required' /etc/pam.d/common-password && sed -i 's/^password.*required.*/password    required            pam_permit.so minlen=9/' /etc/pam.d/common-password || echo 'password    required            pam_permit.so minlen=9' >> /etc/pam.d/common-password
# Vulnerability Advisor : Temporarily remove a specific <package> that was discovered vulnerable
# RUN dpkg --purge --force-all <package>

# Define command to run the application when the container starts
#CMD ["nginx", "-g", "daemon off;"]
