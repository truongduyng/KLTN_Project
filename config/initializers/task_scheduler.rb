scheduler = Rufus::Scheduler.new

scheduler.every("1m") do
  puts 'something from scheduler'
  Thread.new do
    Bussiness.all.each do |bussiness|
      bussiness.branches.each do |branch|
        branch.tickets.where(:begin_use_time => (Time.now.beginning_of_day.. Time.now.end_of_day)).each do |ticket|
          if ticket.status == Ticket::Status[:new] && Time.now > ticket.begin_use_time + 10.minutes
            ticket.status = Ticket::Status[:over]
            ticket.save
          end

          if ticket.status == Ticket::Status[:doing] && Time.now > ticket.end_use_time
            ticket.status = Ticket::Status[:waiting]
            ticket.save
          end
        end
      end
    end
  end
end