require 'mina/rails'
require 'mina/git'
require 'slack-notifier'

# Basic settings:
#   domain       - The hostname to SSH to.
#   deploy_to    - Path to deploy into.
#   repository   - Git repo to clone from. (needed by mina/git)
#   branch       - Branch name to deploy. (needed by mina/git)

# Common Settings
set :repository, 'git@github.com:Bizongo/Partner-Hub.git'
set :port, '22'
set :forward_agent, true
set :stage, ENV['to']
set :staging, ENV['staging']
set :deploy_to, '/home/rails/apps/partner_hub'
set :keep_releases, '0' # How many releases should Mina keep on the server
set :user, 'rails'
set :domain, 'indopus.in'
print fetch(:stage)

task :remote_environment do
  case fetch(:stage)
  when 'qa1'
    set :branch, current_git_branch
    print_status "Deploying branch #{current_git_branch} to #{fetch(:stage)} (#{fetch(:domain)})"
    set :domain, 'qa1.indopus.in'

  when 'qa2'
    set :branch, current_git_branch
    set :domain, 'qa2.indopus.in'
    print_status "Deploying branch #{current_git_branch} to #{fetch(:stage)} (#{fetch(:domain)})"

  when 'qa3'
    set :branch, current_git_branch
    set :domain, 'qa3.indopus.in'
    print_status "Deploying branch #{current_git_branch} to #{fetch(:stage)} (#{fetch(:domain)})"

  when 'qa4'
    set :branch, current_git_branch
    print_status "Deploying branch #{current_git_branch} to #{fetch(:stage)} (#{fetch(:domain)})"
    set :domain, 'qa4.indopus.in'

  when 'qa5'
    set :branch, current_git_branch
    print_status "Deploying branch #{current_git_branch} to #{fetch(:stage)} (#{fetch(:domain)})"
    set :domain, 'qa5.indopus.in'

  when 'qa6'
    set :branch, current_git_branch
    print_status "Deploying branch #{current_git_branch} to #{fetch(:stage)} (#{fetch(:domain)})"
    set :domain, 'qa6.indopus.in'

  when 'qa7'
    set :branch, current_git_branch
    print_status "Deploying branch #{current_git_branch} to #{fetch(:stage)} (#{fetch(:domain)})"
    set :domain, 'qa7.indopus.in'

  when 'qa8'
    set :branch, current_git_branch
    set :domain, 'qa8.indopus.in'
    print_status "Deploying branch #{current_git_branch} to #{fetch(:stage)} (#{fetch(:domain)})"

  when 'qa9'
    set :branch, current_git_branch
    set :domain, 'qa9.indopus.in'
    print_status "Deploying branch #{current_git_branch} to #{fetch(:stage)} (#{fetch(:domain)})"

  when 'qa10'
    set :branch, current_git_branch
    set :domain, 'qa10.indopus.in'
    print_status "Deploying branch #{current_git_branch} to #{fetch(:stage)} (#{fetch(:domain)})"

  when 'qa11'
    set :branch, current_git_branch
    set :domain, 'qa11.indopus.in'
    print_status "Deploying branch #{current_git_branch} to #{fetch(:stage)} (#{fetch(:domain)})"

  when 'qa15'
      set :branch, current_git_branch
      set :domain, 'qa15.indopus.in'
      print_status "Deploying branch #{current_git_branch} to #{fetch(:stage)} (#{fetch(:domain)})"

  when 'staging'
    set :branch, current_git_branch
    print_status "Deploying branch #{current_git_branch} to #{fetch(:stage)} (#{fetch(:domain)})"

  #when 'demo'
    #set :branch, current_git_branch
    #set :deploy_to, '/home/ubuntu/leadplus_frontend/demo/leadplus_frontend'
    #print_status "Deploying branch #{current_git_branch} to #{fetch(:stage)} (#{fetch(:domain)})"

  when 'production'
    set :branch, current_git_branch
    if current_git_branch != 'master'
      print_error "Please checkout to branch master if you want to deploy to production."
      exit
    end
    set :domain, 'partnerhub.bizongo.com'
    set :deploy_to, '/home/rails/apps/partner_hub'
    set :keep_releases, '4' # How many releases should Mina keep on the server
    set :user, 'rails'
    print_status "Deploying branch #{current_git_branch} to #{fetch(:stage)} (#{fetch(:domain)})"
  else
    print_error "Please specify a stage. eg. mina deploy to=qa2"
    exit
  end
end

# For system-wide RVM install.

def current_git_branch
  `git symbolic-ref --short HEAD`.chomp
end

def current_git_user
  user = `git config user.name`.chomp
  email = `git config user.email`.chomp

  "#{user} (#{email})"
end

# Manually create these paths in shared/ (eg: shared/config/database.yml) in your server.
# They will be linked in the 'deploy:link_shared_paths' step.

# This task is the environment that is loaded for most commands, such as
# `mina deploy` or `mina rake`.


# Put any custom mkdir's in here for when `mina setup` is ran.
# For Rails apps, we'll make some of the shared paths that are shared between
# all releases.
# Put any custom mkdir's in here for when `mina setup` is ran.
# For Rails apps, we'll make some of the shared paths that are shared between
# all releases.

#task :setup => :remote_environment do
#  command %[touch "#{fetch(:deploy_to)}/shared/.env"]
#  command %[echo "-----> Be sure to edit 'shared/.env'."]
#end


desc "Package js file using npm start command.."
task :npm_start => :remote_environment do
  case fetch(:stage)
  when 'staging'
    command "npm run start:staging"
  when 'qa1'
    command "npm run start:staging"
  when 'qa2'
    command "npm run start:staging"
  when 'qa3'
    command "npm run start:staging"
  when 'qa4'
    command "npm run start:staging"
  when 'qa5'
    command "npm run start:staging"
  when 'qa6'
    command "npm run start:staging"
  when 'qa7'
    command "npm run start:staging"
  when 'qa8'
    command "npm run start:staging"
  when 'qa9'
    command "npm run start:staging"
  when 'qa10'
    command "npm run start:staging"
  when 'qa11'
    command "npm run start:staging"
  when 'qa15'
      command "npm run start:staging"
  #when 'demo'
    #command "npm run staging"
  when 'production'
    command "npm run start:prod"
  end
end

desc "Install NPM Dependencies"
task :npm_install => :remote_environment do
  command "npm install"
end

desc "Notify team on Slack"
task :notify_team do
  notifier = Slack::Notifier.new(
    "https://hooks.slack.com/services/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",
    channel: '#dev_notifications',
    username: 'mina' )
    notifier.ping("Branch *#{current_git_branch}* for PartnerHub frontend deployed to *#{fetch(:stage)} #{fetch(:domain)}* by #{current_git_user}")
  # case stage
  # when 'staging'
  #   notifier.ping("Branch *#{current_git_branch}* for Bizongo Procurement-Center-App deployed to *#{stage} #{domain}* by #{current_git_user}")
  # when 'production'
  #   notifier.ping("Branch *#{current_git_branch}* for Bizongo Procurement-Center-App deployed to *#{stage} (admin.bizongo.in)* by #{current_git_user}")
  # end
end

desc "Deletes deploy.lock to allow redeploy"
task :deploy_unlock do
  command %[cd #{fetch(:deploy_to)}; rm deploy.lock || true]
end

desc "Fetching the configuration"
task :fetch_config => :remote_environment do
  command "wget $CONFIG_SERVER_URL/*/*/master/partnerhub-#{fetch(:stage)}.txt -O .env"
end


desc "Rolls back the latest release"
task :rollback => :remote_environment do
  command %[echo "-----> Rolling back to previous release for instance: #{fetch(:domain)}"]

  # ls command below must return two rows. first of the two contains the 2nd latest version.
  command %[last=`ls "#{fetch(:deploy_to)}/releases" -Art | sort -n | tail -n 2 | sed -n '1p'`]
  command %[current=`ls "#{fetch(:deploy_to)}/releases" -Art | sort -n | tail -n 2 | sed -n '2p'`]

  # sanity check: are both versions actual numbers? is the target folder available?
  command %[
      if [ ! -n "$last" ] || [ ! -n "$current" ] || [ ! -d "#{fetch(:deploy_to)}/releases/$last" ];
      then
          echo "ERROR: No version to roll back to!";
              exit 1;
          fi
        ]
  command %[echo "Moving from $current to $last"]

  # remove latest release folder (active release)
  command %[ls "#{fetch(:deploy_to)}/releases" -Art | sort -n | tail -n 1 | xargs -I active rm -rf "#{fetch(:deploy_to)}/releases/active"]

  # delete existing sym link and create a new symlink pointing to the previous release
  command %[rm "#{fetch(:deploy_to)}/current"]
  command %[ls -Art "#{fetch(:deploy_to)}/releases" | sort -n | tail -n 1 | xargs -I active ln -s "#{fetch(:deploy_to)}/releases/active" "#{fetch(:deploy_to)}/current"]
  # if fetch(:stage) != 'production' || fetch(:stage) != 'qa3'
  #   invoke :'to_s3'
  # end
  invoke :'notify_team'
end


desc "Deploys the current version to the server."
task :deploy => :remote_environment do
  deploy do
    invoke :'git:clone'
    invoke :'fetch_config'
    invoke :'npm_install'
    invoke :'npm_start'
    invoke :'deploy:cleanup'
    on :launch do
      invoke :'notify_team'
      # if fetch(:stage) != 'production' || fetch(:stage) != 'qa3'
      #   invoke :'to_s3'
      # end
      command "for d in #{fetch(:deploy_to)}/releases/* ; do (cd $d && rm -rf node_modules); done"
    end
  end
end
