from time import gmtime, strftime       # time stamp

def set_time( end_time ):

    time_now = strftime("%H:%M", gmtime()) # '01:54 || 13:25'


    # if the end is s single digit themn excute this
    if end_time[1] == ' ':

        # checking if there '0' brefore a actaully number in mins
        if int( time_now[3:len(time_now)][0] ) == 0:

            end_time = int( end_time[0] ) + int( time_now[3: len(time_now)] )

            if end_time < 60:

                # returns back a result of the plus mins to the current time not affecting the hour as result '04:54'
                end_time = time_now[0:3] + str( end_time )

                return end_time

            else:

                end_time = time_now[1:2] +':'+ str( int( end_time[0] ) + int( time_now[3:len(time_now)] ) )

                return end_time

        else:

            end_time = int( end_time[0] ) + int( time_now[3: len(time_now)] )

            # if the sum is of 'end_time' is not greater 60
            if end_time < 60:

                # returns back a result of the plus mins to the current time not affecting the hour as result '04:54'
                end_time = time_now[0:3] + str( end_time )
                return end_time
            else:
                end_time = str( int( time_now[0:3] ) + 1 ) + '0' + str( end_time - 60 )
                return{'end_time': end_time, 'time_now': time_now}


    # if end_time varible is double digit
    else:

        # assign the 'end_time' to the 'end_time' plus the mins of 'time_now'
        end_time = str( int( time_now[3:len( time_now )] ) + int( end_time[0:2] ) )
                            # minute

        # # if the sum is of 'end_time' is not greater 60
        if int( end_time ) < 60:

            # returns back a the hour and the mins as result of the minutes plues hour '05:54'
            end_time = time_now[0:2]+ ':' + end_time

            return end_time

        else:
            if str( int( end_time ) - 60 )[0] != '0':

                end_time = '0' + str( int( time_now[0:2] )  - 5 ) + ':0' + str( int( end_time ) - 60 )
                return end_time

            else:
                end_time = str( time_now[0:2] ) + ':' + str( int( end_time ) - 60 )
                return end_time
# print set_time( sys.argv[1] + ' ' + sys.argv[2])
