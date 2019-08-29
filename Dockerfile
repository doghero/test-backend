FROM ruby:2.6.3-stretch

# Dependencies
RUN docker="wait-for-it" \
&& postgresql="postgresql-client" \
&& deps="$docker $postgresql" \
&& apt-get -qq update \
&& apt-get -qq install $deps > /dev/null \
&& rm -rf /var/lib/apt/lists/*

# Include variables
ARG USER
ARG UID

# Test variables
RUN test -n "$USER"
RUN test -n "$UID"

# Create user from host
RUN adduser --quiet --gecos "$USER" --uid "$UID" --disabled-login "$USER"

# Define rails default dir
WORKDIR /test_backend

# Prepare and install Gems
# Add in version 19.03 (https://github.com/moby/buildkit/pull/926)
# COPY --chown=${USER} Gemfile .
# COPY --chown=${USER} Gemfile.lock .
COPY Gemfile .
COPY Gemfile.lock .
# # Remove in version 19.03 (https://github.com/moby/buildkit/pull/926)
RUN chown "$USER":"$USER" Gemfile.lock

USER "$USER"

RUN gem install bundler:2.0.2
RUN bundle install
